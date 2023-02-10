import { appStore } from '@podenco/state/app';
import { canvasStore } from '@podenco/state/canvas';
import { useEffect } from 'react';

export default function useUiControls() {
  const setIsLockedAspectRatio = canvasStore((state) => state.setIsLockedAspectRatio);
  const setIsGrayscale = canvasStore((state) => state.setIsGrayscale);
  const setImgWidth = canvasStore((state) => state.setImgWidth);
  const setImgHeight = canvasStore((state) => state.setImgHeight);
  const setBlurLevel = canvasStore((state) => state.setBlurLevel);
  const canvasInitialized = canvasStore((state) => state.canvasInitialized);
  const {
    width: queryWidth,
    height: queryHeight,
    lockedAspectRatio: queryLockedAspectRatio,
    blur: queryBlur,
    grayscale: queryGrayscale,
  } = appStore((state) => state.params);

  // init ui controls based on query params
  useEffect(() => {
    if (!canvasInitialized) return;
    queryWidth !== null && setImgWidth(queryWidth);
    queryHeight !== null && setImgHeight(queryHeight);
    queryLockedAspectRatio !== null &&
      setIsLockedAspectRatio(queryLockedAspectRatio === 'true' ? true : false);
    queryGrayscale && setIsGrayscale(queryGrayscale === 'true' ? true : false);
    queryBlur && setBlurLevel(queryBlur);
  }, [
    canvasInitialized,
    queryBlur,
    queryGrayscale,
    queryHeight,
    queryLockedAspectRatio,
    queryWidth,
    setBlurLevel,
    setImgHeight,
    setImgWidth,
    setIsGrayscale,
    setIsLockedAspectRatio,
  ]);
}
