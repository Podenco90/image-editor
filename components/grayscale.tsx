import useSetParams from '@podenco/hooks/useSetParams';
import { canvasStore } from '@podenco/state/canvas';
import { Checkbox } from 'antd';
import { useCallback } from 'react';

export default function Grayscale() {
  const canvasRef = canvasStore((state) => state.canvasRef);
  const imgWidth = canvasStore((state) => state.imgWidth);
  const imgHeight = canvasStore((state) => state.imgHeight);
  const isGrayscale = canvasStore((state) => state.isGrayscale);

  const setParams = useSetParams();

  const handleGrayscaleChange = useCallback(
    (value: boolean, push: boolean) => {
      const canvas = canvasRef.current;
      if (canvas && imgWidth !== null && imgHeight !== null) {
        push && setParams({ grayscale: `${value}` });
      }
    },
    [canvasRef, imgHeight, imgWidth, setParams],
  );

  return (
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
  );
}
