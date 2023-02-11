import useCanvasContext from '@podenco/hooks/useCanvasContext';
import { utils } from '@podenco/utils';
import { Button } from 'antd';
import { useCallback } from 'react';

export default function Download() {
  const { imgWidth, imgHeight, canvasRef } = useCanvasContext();
  const downloadCanvas = useCallback(() => {
    if (imgWidth === null || imgHeight === null) return;

    const { bufferCanvas, bufferContext } = utils.createBufferCanvas(imgWidth, imgHeight);

    if (bufferContext) {
      const existingContext = canvasRef.current?.getContext('2d');
      if (existingContext && imgWidth !== null && imgHeight !== null) {
        const imgData = utils.generateImageDataFromContext(existingContext, imgWidth, imgHeight);
        utils.putImgDataOnBuffer(imgData, bufferContext, imgWidth, imgHeight);
        bufferContext.setTransform(
          1 / existingContext.getTransform().a,
          0,
          0,
          1 / existingContext.getTransform().d,
          0,
          0,
        );
        bufferContext.drawImage(bufferCanvas, 0, 0);

        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = bufferCanvas.toDataURL();
        link.click();
      }
    }
  }, [canvasRef, imgHeight, imgWidth]);

  return <Button onClick={() => downloadCanvas()}>Download Image</Button>;
}
