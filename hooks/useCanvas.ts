import { canvasStore } from '@podenco/state/canvas';
import { utils } from '@podenco/utils';
import { useCallback, useEffect } from 'react';
import useQueryParams from './useQueryParams';

export default function useCanvas() {
  const setImgHeight = canvasStore((state) => state.setImgHeight);
  const setImgWidth = canvasStore((state) => state.setImgWidth);
  const canvasInitialized = canvasStore((state) => state.canvasInitialized);
  const setCanvasInitialized = canvasStore((state) => state.setCanvasInitialized);
  const canvasRef = canvasStore((state) => state.canvasRef);
  const srcImg = canvasStore((state) => state.srcImg);
  const srcImgHeight = canvasStore((state) => state.srcImgHeight);
  const srcImgWidth = canvasStore((state) => state.srcImgWidth);
  const setZoomLevel = canvasStore((state) => state.setZoomLevel);
  const canvasContainerRef = canvasStore((state) => state.canvasContainerRef);

  const [params] = useQueryParams();
  const {
    width: queryWidth,
    height: queryHeight,
    blur: queryBlur,
    grayscale: queryGrayscale,
  } = params;

  const initZoomLevel = useCallback(() => {
    if (srcImgWidth && srcImgHeight) {
      const calcWidth = (queryWidth !== null && +queryWidth) || srcImgWidth;
      const calcHeight = (queryHeight !== null && +queryHeight) || srcImgHeight;
      if (canvasContainerRef && canvasContainerRef.current) {
        const element = canvasContainerRef.current;
        const containerWidth = element.clientWidth;
        const containerHeight = element.clientHeight;
        const scaledWidth = containerWidth / calcWidth;
        const scaledHeight = containerHeight / calcHeight;
        const factor = Math.min(scaledWidth, scaledHeight);
        factor < 1 && setZoomLevel(factor);
      }
    }
  }, [canvasContainerRef, queryHeight, queryWidth, setZoomLevel, srcImgHeight, srcImgWidth]);

  // fill canvas with image
  useEffect(() => {
    if (srcImg && srcImgHeight && srcImgWidth && !canvasInitialized) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const calcWidth = (queryWidth !== null && +queryWidth) || srcImgWidth;
        const calcHeight = (queryHeight !== null && +queryHeight) || srcImgHeight;
        canvas.width = calcWidth;
        canvas.height = calcHeight;
        setImgWidth(calcWidth);
        setImgHeight(calcHeight);
        initZoomLevel();
        if (ctx) {
          ctx.drawImage(srcImg, 0, 0);
          setCanvasInitialized(true);
        }
      }
    }
  }, [
    canvasInitialized,
    canvasRef,
    initZoomLevel,
    queryHeight,
    queryWidth,
    setCanvasInitialized,
    setImgHeight,
    setImgWidth,
    setZoomLevel,
    srcImg,
    srcImgHeight,
    srcImgWidth,
  ]);

  // change canvas based on query params
  useEffect(() => {
    if (!canvasInitialized) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context && srcImg) {
      const calcWidth = queryWidth !== null ? +queryWidth : srcImg.naturalWidth;
      const calcHeight = queryHeight !== null ? +queryHeight : srcImg.naturalHeight;
      canvas.height = calcHeight;
      canvas.width = calcWidth;
      queryGrayscale !== null &&
        utils.setGrayscale(canvas, queryGrayscale === 'true' ? true : false);
      queryBlur !== null && utils.setBlur(canvas, +queryBlur);
      context.drawImage(srcImg, 0, 0, calcWidth, calcHeight);
    }
  }, [canvasInitialized, canvasRef, queryBlur, queryGrayscale, queryHeight, queryWidth, srcImg]);
}
