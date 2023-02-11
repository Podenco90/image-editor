import { appStore } from '@podenco/state/app';
import { useEffect } from 'react';

import useCanvasContext from './useCanvasContext';
import useCanvasDispatchContext from './useCanvasDispatchContext';

export default function useUiControls() {
  const { isCanvasInitialized } = useCanvasContext();
  const dispatch = useCanvasDispatchContext();
  const {
    width: queryWidth,
    height: queryHeight,
    lockedAspectRatio: queryLockedAspectRatio,
    blur: queryBlur,
    grayscale: queryGrayscale,
  } = appStore((state) => state.params);

  // init ui controls based on query params
  useEffect(() => {
    if (!isCanvasInitialized) return;
    queryWidth !== null && dispatch({ type: 'set_img_width', payload: queryWidth });
    queryHeight !== null && dispatch({ type: 'set_img_height', payload: queryHeight });
    queryLockedAspectRatio !== null &&
      dispatch({
        type: 'set_is_locked_aspect_ratio',
        payload: queryLockedAspectRatio === 'true' ? true : false,
      });
    queryGrayscale &&
      dispatch({ type: 'set_is_grayscale', payload: queryGrayscale === 'true' ? true : false });
    queryBlur && dispatch({ type: 'set_blur_level', payload: queryBlur });
  }, [
    isCanvasInitialized,
    dispatch,
    queryBlur,
    queryGrayscale,
    queryHeight,
    queryLockedAspectRatio,
    queryWidth,
  ]);
}
