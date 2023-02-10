import useSetParams from '@podenco/hooks/useSetParams';
import { canvasStore } from '@podenco/state/canvas';
import styles from '@podenco/styles/Edit.module.css';
import { Slider } from 'antd';
import { SliderMarks } from 'antd/es/slider';
import { useCallback } from 'react';

const sliderMarks: SliderMarks = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
};

export default function Blur() {
  const canvasRef = canvasStore((state) => state.canvasRef);
  const imgWidth = canvasStore((state) => state.imgWidth);
  const imgHeight = canvasStore((state) => state.imgHeight);
  const blurLevel = canvasStore((state) => state.blurLevel);

  const setParams = useSetParams();

  const handleBlurLevelChange = useCallback(
    (value: number, push: boolean) => {
      const canvas = canvasRef.current;

      if (canvas && imgWidth !== null && imgHeight !== null) {
        push && setParams({ blur: `${value}` });
      }
    },
    [canvasRef, imgHeight, imgWidth, setParams],
  );
  return (
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
  );
}
