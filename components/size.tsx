import { canvasStore } from '@podenco/state/canvas';
import styles from '@podenco/styles/Edit.module.css';
import { Checkbox, Input } from 'antd';
import { useCallback } from 'react';

export default function Size({
  setParams,
}: {
  setParams: (keyVal: Record<string, string>) => void;
}) {
  const aspectRatio = canvasStore((state) => state.aspectRatio);
  const isLockedAspectRatio = canvasStore((state) => state.isLockedAspectRatio);
  const imgWidth = canvasStore((state) => state.imgWidth);
  const setIsLockedAspectRatio = canvasStore((state) => state.setIsLockedAspectRatio);
  const setAspectRatio = canvasStore((state) => state.setAspectRatio);
  const imgHeight = canvasStore((state) => state.imgHeight);
  const canvasRef = canvasStore((state) => state.canvasRef);

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

  const handleAspectRatioLock = useCallback(() => {
    setIsLockedAspectRatio(!isLockedAspectRatio);
    setParams({ lockedAspectRatio: `${!isLockedAspectRatio}` });
  }, [setIsLockedAspectRatio, isLockedAspectRatio, setParams]);

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
