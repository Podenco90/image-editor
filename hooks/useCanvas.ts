import { canvasStore } from '@podenco/state/canvas';
import { useEffect } from 'react';
import useQueryParams from './useQueryParams';

export default function useCanvas({
  handleBlurLevelChange,
  handleGrayscaleChange,
}: {
  handleBlurLevelChange: (value: number, push: boolean) => void;
  handleGrayscaleChange: (value: boolean, push: boolean) => void;
}) {
  const setImgHeight = canvasStore((state) => state.setImgHeight);
  const setImgWidth = canvasStore((state) => state.setImgWidth);
  const setAspectRatio = canvasStore((state) => state.setAspectRatio);
  const canvasInitialized = canvasStore((state) => state.canvasInitialized);
  const setCanvasInitialized = canvasStore((state) => state.setCanvasInitialized);
  const canvasRef = canvasStore((state) => state.canvasRef);
  const srcImg = canvasStore((state) => state.srcImg);
  const srcImgHeight = canvasStore((state) => state.srcImgHeight);
  const srcImgWidth = canvasStore((state) => state.srcImgWidth);
  const srcImgAspectRatio = canvasStore((state) => state.srcImgAspectRatio);

  const [params] = useQueryParams();
  const {
    width: queryWidth,
    height: queryHeight,
    blur: queryBlur,
    grayscale: queryGrayscale,
  } = params;
  // fill canvas with image
  useEffect(() => {
    if (srcImg && srcImgHeight && srcImgWidth) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = srcImgWidth;
        canvas.height = srcImgHeight;
        setImgWidth(srcImgWidth);
        setImgHeight(srcImgHeight);
        setAspectRatio(srcImgAspectRatio);
        if (ctx) {
          ctx.drawImage(srcImg, 0, 0);
          setCanvasInitialized(true);
        }
      }
    }
  }, [
    srcImg,
    srcImgHeight,
    srcImgWidth,
    canvasRef,
    setAspectRatio,
    setCanvasInitialized,
    setImgHeight,
    setImgWidth,
    srcImgAspectRatio,
  ]);

  // change canvas based on query params
  useEffect(() => {
    if (!canvasInitialized) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context && srcImg) {
      const drawWidth = queryWidth !== null ? +queryWidth : srcImg.naturalWidth;
      const drawHeight = queryHeight !== null ? +queryHeight : srcImg.naturalHeight;
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      handleGrayscaleChange(queryGrayscale === 'true' ? true : false, false);
      queryBlur && handleBlurLevelChange(+queryBlur, false);
      context.drawImage(srcImg, 0, 0, drawWidth, drawHeight);
    }
  }, [
    canvasInitialized,
    canvasRef,
    handleBlurLevelChange,
    handleGrayscaleChange,
    queryBlur,
    queryGrayscale,
    queryHeight,
    queryWidth,
    srcImg,
  ]);
}
