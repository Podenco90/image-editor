import { canvasStore } from '@podenco/state/canvas';
import styles from '@podenco/styles/Edit.module.css';

export default function Canvas() {
  const canvasRef = canvasStore((state) => state.canvasRef);
  const canvasContainerRef = canvasStore((state) => state.canvasContainerRef);
  const zoomLevel = canvasStore((state) => state.zoomLevel);
  const imgHeight = canvasStore((state) => state.imgHeight);
  const imgWidth = canvasStore((state) => state.imgWidth);

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
