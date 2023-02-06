import useCanvas from '@podenco/hooks/useCanvas';
import useImage from '@podenco/hooks/useImage';
import useQueryParams from '@podenco/hooks/useQueryParams';
import useUiControls from '@podenco/hooks/useUiControls';
import { canvasStore } from '@podenco/state/canvas';
import styles from '@podenco/styles/Edit.module.css';
import { utils } from '@podenco/utils';
import { Button, Checkbox, Divider, Input, Slider } from 'antd';
import { SliderMarks } from 'antd/es/slider';
import Link from 'next/link';
import { useCallback } from 'react';

const sliderMarks: SliderMarks = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
};

export default function Edit() {
  const scalingFactor = canvasStore((state) => state.scalingFactor);
  const setScalingFactor = canvasStore((state) => state.setScalingFactor);
  const imgHeight = canvasStore((state) => state.imgHeight);
  const setImgHeight = canvasStore((state) => state.setImgHeight);
  const imgWidth = canvasStore((state) => state.imgWidth);
  const setImgWidth = canvasStore((state) => state.setImgWidth);
  const isLockedAspectRatio = canvasStore((state) => state.isLockedAspectRatio);
  const setIsLockedAspectRatio = canvasStore((state) => state.setIsLockedAspectRatio);
  const aspectRatio = canvasStore((state) => state.aspectRatio);
  const setAspectRatio = canvasStore((state) => state.setAspectRatio);
  const isGrayscale = canvasStore((state) => state.isGrayscale);
  const setIsGrayscale = canvasStore((state) => state.setIsGrayscale);
  const blurLevel = canvasStore((state) => state.blurLevel);
  const setBlurLevel = canvasStore((state) => state.setBlurLevel);
  const srcImg = canvasStore((state) => state.srcImg);

  const canvasRef = canvasStore((state) => state.canvasRef);

  useImage();

  const [_, setParams] = useQueryParams();

  const handleGrayscaleChange = useCallback(
    (value: boolean, push: boolean) => {
      const canvas = canvasRef.current;
      if (canvas && imgWidth !== null && imgHeight !== null) {
        setIsGrayscale(value);
        push && setParams({ grayscale: `${value}` });
        utils.setGrayscale(canvas, value);
        utils.drawImageOnCanvas(canvas, srcImg, imgWidth, imgHeight);
      }
    },
    [canvasRef, imgHeight, imgWidth, setIsGrayscale, setParams, srcImg],
  );

  const handleBlurLevelChange = useCallback(
    (value: number, push: boolean) => {
      const canvas = canvasRef.current;

      if (canvas && imgWidth !== null && imgHeight !== null) {
        setBlurLevel(value);
        push && setParams({ blur: `${value}` });
        utils.setBlur(canvas, value);
        utils.drawImageOnCanvas(canvas, srcImg, imgWidth, imgHeight);
      }
    },
    [canvasRef, imgHeight, imgWidth, setBlurLevel, setParams, srcImg],
  );

  const handleCanvasScaleChange = useCallback(
    (value: number) => {
      const canvas = canvasRef.current;

      if (canvas && imgWidth !== null && imgHeight !== null) {
        utils.clearCanvas(canvas);
        utils.scaleCanvas(canvas, value);
        utils.drawImageOnCanvas(canvas, srcImg, imgWidth, imgHeight);

        setScalingFactor(value);
      }
    },
    [canvasRef, imgWidth, imgHeight, srcImg, setScalingFactor],
  );

  const handleImgWidthChange = useCallback(
    (width: string) => {
      if (!aspectRatio || !imgHeight) return;
      const canvas = canvasRef.current;
      if (canvas) {
        if (isLockedAspectRatio) {
          const newHeight = +width / aspectRatio;

          utils.resizeCanvas(canvas, +width, newHeight);
          utils.drawImageOnCanvas(canvas, srcImg, +width, newHeight);

          setImgWidth(+width);
          setImgHeight(newHeight);

          setParams({ width, height: `${newHeight}` });

          return;
        }
        utils.resizeCanvas(canvas, +width, imgHeight);
        utils.drawImageOnCanvas(canvas, srcImg, +width, imgHeight);

        setImgWidth(+width);
        setParams({ width });

        setAspectRatio(+width / imgHeight);
      }
    },
    [
      aspectRatio,
      canvasRef,
      imgHeight,
      isLockedAspectRatio,
      setAspectRatio,
      setImgHeight,
      setImgWidth,
      setParams,
      srcImg,
    ],
  );

  const handleImgHeightChange = useCallback(
    (height: string) => {
      if (!aspectRatio || !imgWidth) return;
      const canvas = canvasRef.current;
      if (canvas) {
        if (isLockedAspectRatio) {
          const newWidth = +height * aspectRatio;

          utils.resizeCanvas(canvas, newWidth, +height);
          utils.drawImageOnCanvas(canvas, srcImg, newWidth, +height);

          setImgHeight(+height);
          setImgWidth(newWidth);

          setParams({ width: `${newWidth}`, height });

          return;
        }
        utils.resizeCanvas(canvas, imgWidth, +height);
        utils.drawImageOnCanvas(canvas, srcImg, imgWidth, +height);

        setImgHeight(+height);
        setParams({ height });
        setAspectRatio(imgWidth / +height);
      }
    },
    [
      aspectRatio,
      canvasRef,
      imgWidth,
      isLockedAspectRatio,
      setAspectRatio,
      setImgHeight,
      setImgWidth,
      setParams,
      srcImg,
    ],
  );

  const handleAspectRatioLock = useCallback(() => {
    setIsLockedAspectRatio(!isLockedAspectRatio);
    setParams({ lockedAspectRatio: `${!isLockedAspectRatio}` });
  }, [setIsLockedAspectRatio, isLockedAspectRatio, setParams]);

  const downloadCanvas = useCallback(() => {
    if (imgWidth === null || imgHeight === null) return;

    const { bufferCanvas, bufferContext } = utils.createBufferCanvas(imgWidth, imgHeight);

    if (bufferContext) {
      const existingContext = canvasRef.current?.getContext('2d');
      if (existingContext && imgWidth !== null && imgHeight !== null) {
        const imgData = utils.generateImageDataFromContext(existingContext, imgWidth, imgHeight);
        utils.putImgDataOnBuffer(imgData, bufferContext, imgWidth, imgHeight);
        bufferContext.setTransform(
          1 / existingContext.getTransform().a,
          0,
          0,
          1 / existingContext.getTransform().d,
          0,
          0,
        );
        bufferContext.drawImage(bufferCanvas, 0, 0);

        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = bufferCanvas.toDataURL();
        link.click();
      }
    }
  }, [canvasRef, imgHeight, imgWidth]);

  useCanvas({
    handleBlurLevelChange,
    handleGrayscaleChange,
  });

  useUiControls();

  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        <canvas className={styles.canvas__element} id="canvas" ref={canvasRef}></canvas>
      </div>
      <div className={styles.actions}>
        <div className={styles.actions__zoom}>
          <Button
            onClick={() => scalingFactor > 0.15 && handleCanvasScaleChange(scalingFactor - 0.1)}
          >
            -
          </Button>
          <span className={styles.label}>Zoom Level: {Math.floor(scalingFactor * 100)}%</span>
          <Button onClick={() => scalingFactor < 1 && handleCanvasScaleChange(scalingFactor + 0.1)}>
            +
          </Button>
        </div>
        <Divider />
        <div className={styles.actions__sizing}>
          <div className={`${styles.label}`}>Size (width x height)</div>
          <div className={styles.actions__inputs}>
            <Input
              name="width"
              value={imgWidth || 0}
              onChange={(event) => handleImgWidthChange(event.target.value)}
            />
            <span>x</span>
            <Input
              name="height"
              value={imgHeight || 0}
              onChange={(event) => handleImgHeightChange(event.target.value)}
            />
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="lock-aspect-ratio"
              checked={isLockedAspectRatio}
              onChange={() => handleAspectRatioLock()}
            >
              Lock aspect ratio
            </Checkbox>
          </div>
        </div>
        <Divider />
        <div>
          <Checkbox
            onChange={() => handleGrayscaleChange(!isGrayscale, true)}
            name="grayscale"
            checked={isGrayscale}
            type="checkbox"
          >
            Grayscale
          </Checkbox>
        </div>
        <Divider />
        <div className={styles.actions__blur}>
          <div className={styles.label}>Blur</div>
          <Slider
            marks={sliderMarks}
            className={styles.actions__slider}
            min={0}
            max={10}
            step={1}
            value={blurLevel}
            onChange={(e) => handleBlurLevelChange(e, true)}
          ></Slider>
        </div>
        <Divider />
        <Button onClick={() => downloadCanvas()}>Download Image</Button>
        <Divider />
        <Link className={styles.link} href="/">
          Back to search results
        </Link>
      </div>
    </div>
  );
}
