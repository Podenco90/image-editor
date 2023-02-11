import useCanvasContext from '@podenco/hooks/useCanvasContext';
import useCanvasDispatchContext from '@podenco/hooks/useCanvasDispatchContext';
import useSetParams from '@podenco/hooks/useSetParams';
import styles from '@podenco/styles/Edit.module.css';
import { Checkbox, Input } from 'antd';
import { useCallback } from 'react';

export default function Size() {
  const { aspectRatio, isLockedAspectRatio, imgWidth, imgHeight, canvasRef } = useCanvasContext();
  const dispatch = useCanvasDispatchContext();
  const setParams = useSetParams();

  const handleImgHeightChange = useCallback(
    (height: string) => {
      if (aspectRatio === null || imgWidth === null) return;
      const canvas = canvasRef.current;
      if (canvas) {
        const normalizedHeight = height.replace(/^0+/, '');
        const newWidth = isLockedAspectRatio ? +normalizedHeight * aspectRatio : imgWidth;
        setParams({ width: `${newWidth}`, height: normalizedHeight || '0' });
        if (+normalizedHeight === 0 || newWidth === 0) return;
        dispatch({ type: 'set_aspect_ratio', payload: newWidth / +(normalizedHeight || 0) });
      }
    },
    [aspectRatio, imgWidth, canvasRef, isLockedAspectRatio, setParams, dispatch],
  );

  const handleImgWidthChange = useCallback(
    (width: string) => {
      if (aspectRatio === null || imgHeight === null) return;
      const canvas = canvasRef.current;
      if (canvas) {
        const normalizedWidth = width.replace(/^0+/, '');
        const newHeight = isLockedAspectRatio ? +normalizedWidth / aspectRatio : imgHeight;
        setParams({ width: normalizedWidth || '0', height: `${newHeight}` });
        if (+normalizedWidth === 0 || newHeight === 0) return;
        dispatch({ type: 'set_aspect_ratio', payload: +(normalizedWidth || 0) / newHeight });
      }
    },
    [aspectRatio, canvasRef, dispatch, imgHeight, isLockedAspectRatio, setParams],
  );

  const handleAspectRatioLock = useCallback(() => {
    dispatch({ type: 'set_is_locked_aspect_ratio', payload: !isLockedAspectRatio });
    setParams({ lockedAspectRatio: `${!isLockedAspectRatio}` });
  }, [dispatch, isLockedAspectRatio, setParams]);

  return (
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
  );
}
