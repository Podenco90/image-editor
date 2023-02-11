import useCanvasContext from '@podenco/hooks/useCanvasContext';
import useSetParams from '@podenco/hooks/useSetParams';
import { Checkbox } from 'antd';
import { useCallback } from 'react';

export default function Grayscale() {
  const { canvasRef, imgWidth, imgHeight, isGrayscale } = useCanvasContext();
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
