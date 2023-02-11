import useCanvasContext from '@podenco/hooks/useCanvasContext';
import useCanvasDispatchContext from '@podenco/hooks/useCanvasDispatchContext';
import styles from '@podenco/styles/Edit.module.css';
import { utils } from '@podenco/utils';
import { Button } from 'antd';

export default function Zoom() {
  const { zoomLevel } = useCanvasContext();
  const dispatch = useCanvasDispatchContext();
  return (
    <div className={styles.actions__zoom}>
      <Button
        onClick={() =>
          zoomLevel > 0.1 &&
          dispatch({ type: 'set_zoom_level', payload: utils.calcZoomOutLevel(zoomLevel) })
        }
      >
        -
      </Button>
      <span className={styles.label}>Zoom Level: {Math.round(zoomLevel * 100)}%</span>
      <Button
        onClick={() =>
          dispatch({ type: 'set_zoom_level', payload: utils.calcZoomInLevel(zoomLevel) })
        }
      >
        +
      </Button>
    </div>
  );
}
