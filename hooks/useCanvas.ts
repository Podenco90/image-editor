import { appStore } from '@podenco/state/app';
import { utils } from '@podenco/utils';
import { useCallback, useEffect } from 'react';

import useCanvasContext from './useCanvasContext';
import useCanvasDispatchContext from './useCanvasDispatchContext';

export default function useCanvas() {
  const {
    srcImgWidth,
    srcImgHeight,
    canvasContainerRef,
    zoomLevel,
    srcImg,
    isCanvasInitialized,
    canvasRef,
  } = useCanvasContext();
  const dispatch = useCanvasDispatchContext();
  const {
    width: queryWidth,
    height: queryHeight,
    blur: queryBlur,
    grayscale: queryGrayscale,
  } = appStore((state) => state.params);

  const initZoomLevel = useCallback(() => {
    if (srcImgWidth && srcImgHeight) {
      const calcWidth = (queryWidth !== null && queryWidth) || srcImgWidth;
      const calcHeight = (queryHeight !== null && queryHeight) || srcImgHeight;
      if (canvasContainerRef && canvasContainerRef.current) {
        const element = canvasContainerRef.current;
        const containerWidth = element.clientWidth;
        const containerHeight = element.clientHeight;
        const scaledWidth = containerWidth / calcWidth;
        const scaledHeight = containerHeight / calcHeight;
        const factor = Math.min(scaledWidth, scaledHeight);
        factor < 1 && dispatch({ type: 'set_zoom_level', payload: zoomLevel });
      }
    }
  }, [canvasContainerRef, dispatch, queryHeight, queryWidth, srcImgHeight, srcImgWidth, zoomLevel]);

  // fill canvas with image
  useEffect(() => {
    if (srcImg && srcImgHeight && srcImgWidth && !isCanvasInitialized) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const calcWidth = (queryWidth !== null && queryWidth) || srcImgWidth;
        const calcHeight = (queryHeight !== null && queryHeight) || srcImgHeight;
        canvas.width = calcWidth;
        canvas.height = calcHeight;
        dispatch({ type: 'set_img_width', payload: calcWidth });
        dispatch({ type: 'set_img_height', payload: calcHeight });
        initZoomLevel();
        if (ctx) {
          ctx.drawImage(srcImg, 0, 0);
          dispatch({ type: 'set_canvas_initialized', payload: true });
        }
      }
    }
  }, [
    isCanvasInitialized,
    canvasRef,
    dispatch,
    initZoomLevel,
    queryHeight,
    queryWidth,
    srcImg,
    srcImgHeight,
    srcImgWidth,
  ]);

  // change canvas based on query params
  useEffect(() => {
    if (!isCanvasInitialized) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context && srcImg) {
      const calcWidth = queryWidth !== null ? queryWidth : srcImg.naturalWidth;
      const calcHeight = queryHeight !== null ? queryHeight : srcImg.naturalHeight;
      canvas.height = calcHeight;
      canvas.width = calcWidth;
      queryGrayscale !== null &&
        utils.setGrayscale(canvas, queryGrayscale === 'true' ? true : false);
      queryBlur !== null && utils.setBlur(canvas, queryBlur);
      context.drawImage(srcImg, 0, 0, calcWidth, calcHeight);
    }
  }, [isCanvasInitialized, canvasRef, queryBlur, queryGrayscale, queryHeight, queryWidth, srcImg]);
}
