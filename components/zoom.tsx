import { canvasStore } from '@podenco/state/canvas';
import styles from '@podenco/styles/Edit.module.css';
import { utils } from '@podenco/utils';
import { Button } from 'antd';

export default function Zoom() {
  const zoomLevel = canvasStore((state) => state.zoomLevel);
  const setZoomLevel = canvasStore((state) => state.setZoomLevel);

  return (
    <div className={styles.actions__zoom}>
      <Button onClick={() => zoomLevel > 0.1 && setZoomLevel(utils.calcZoomOutLevel(zoomLevel))}>
        -
      </Button>
      <span className={styles.label}>Zoom Level: {Math.round(zoomLevel * 100)}%</span>
      <Button onClick={() => setZoomLevel(utils.calcZoomInLevel(zoomLevel))}>+</Button>
    </div>
  );
}
