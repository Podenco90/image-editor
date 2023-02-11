import useCanvasContext from '@podenco/hooks/useCanvasContext';
import styles from '@podenco/styles/Edit.module.css';

export default function Canvas() {
  const { canvasContainerRef, zoomLevel, canvasRef, imgHeight, imgWidth } = useCanvasContext();

  return (
    <div ref={canvasContainerRef} className={styles.canvas}>
      <canvas
        style={{
          height: zoomLevel * (imgHeight || 0),
          width: zoomLevel * (imgWidth || 0),
        }}
        className={styles.canvas__element}
        id="canvas"
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
