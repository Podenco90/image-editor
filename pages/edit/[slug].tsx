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
import { useCallback, useRef } from 'react';

const sliderMarks: SliderMarks = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
};

export default function Edit() {
  const imgHeight = canvasStore((state) => state.imgHeight);
  const imgWidth = canvasStore((state) => state.imgWidth);
  const isLockedAspectRatio = canvasStore((state) => state.isLockedAspectRatio);
  const setIsLockedAspectRatio = canvasStore((state) => state.setIsLockedAspectRatio);
  const aspectRatio = canvasStore((state) => state.aspectRatio);
  const setAspectRatio = canvasStore((state) => state.setAspectRatio);
  const isGrayscale = canvasStore((state) => state.isGrayscale);
  const blurLevel = canvasStore((state) => state.blurLevel);
  const canvasRef = canvasStore((state) => state.canvasRef);
  const zoomLevel = canvasStore((state) => state.zoomLevel);
  const setZoomLevel = canvasStore((state) => state.setZoomLevel);

  const container = useRef<HTMLDivElement>(null);

  useImage();

  const [_, setParams] = useQueryParams();

  const handleGrayscaleChange = useCallback(
    (value: boolean, push: boolean) => {
      const canvas = canvasRef.current;
      if (canvas && imgWidth !== null && imgHeight !== null) {
        push && setParams({ grayscale: `${value}` });
      }
    },
    [canvasRef, imgHeight, imgWidth, setParams],
  );

  const handleBlurLevelChange = useCallback(
    (value: number, push: boolean) => {
      const canvas = canvasRef.current;

      if (canvas && imgWidth !== null && imgHeight !== null) {
        push && setParams({ blur: `${value}` });
      }
    },
    [canvasRef, imgHeight, imgWidth, setParams],
  );

  const handleImgWidthChange = useCallback(
    (width: string) => {
      if (aspectRatio === null || imgHeight === null) return;
      const canvas = canvasRef.current;
      if (canvas) {
        const newHeight = isLockedAspectRatio ? +width / aspectRatio : imgHeight;
        setParams({ width: width || '0', height: `${newHeight}` });
        if (+width === 0 || newHeight === 0) return;
        setAspectRatio(+(width || 0) / newHeight);
      }
    },
    [aspectRatio, canvasRef, imgHeight, isLockedAspectRatio, setAspectRatio, setParams],
  );

  const handleImgHeightChange = useCallback(
    (height: string) => {
      if (aspectRatio === null || imgWidth === null) return;
      const canvas = canvasRef.current;
      if (canvas) {
        const newWidth = isLockedAspectRatio ? +height * aspectRatio : imgWidth;
        setParams({ width: `${newWidth}`, height: height || '0' });
        if (+height === 0 || newWidth === 0) return;
        setAspectRatio(newWidth / +(height || 0));
      }
    },
    [aspectRatio, canvasRef, imgWidth, isLockedAspectRatio, setAspectRatio, setParams],
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

  useUiControls();

  useCanvas(container);

  return (
    <div className={styles.container}>
      <div ref={container} className={styles.canvas}>
        <canvas
          style={{
            height: zoomLevel * (imgHeight || 0),
            width: zoomLevel * (imgWidth || 0),
          }}
          className={styles.canvas__element}
          id="canvas"
          ref={canvasRef}
        ></canvas>
      </div>
      <div className={styles.actions}>
        <div className={styles.actions__zoom}>
          <Button
            onClick={() => zoomLevel > 0.1 && setZoomLevel(utils.calcZoomOutLevel(zoomLevel))}
          >
            -
          </Button>
          <span className={styles.label}>Zoom Level: {Math.round(zoomLevel * 100)}%</span>
          <Button onClick={() => setZoomLevel(utils.calcZoomInLevel(zoomLevel))}>+</Button>
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
