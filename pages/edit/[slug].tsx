import BlurComponent from '@podenco/components/blur';
import CanvasComponent from '@podenco/components/canvas';
import DownloadComponent from '@podenco/components/download';
import GrayscaleComponent from '@podenco/components/grayscale';
import SizeComponent from '@podenco/components/size';
import ZoomComponent from '@podenco/components/zoom';
import useCanvas from '@podenco/hooks/useCanvas';
import useCanvasDispatchContext from '@podenco/hooks/useCanvasDispatchContext';
import useImage from '@podenco/hooks/useImage';
import useQueryParams from '@podenco/hooks/useQueryParams';
import useUiControls from '@podenco/hooks/useUiControls';
import styles from '@podenco/styles/Edit.module.css';
import { Divider } from 'antd';
import Link from 'next/link';
import { useUnmount } from 'react-use';

export default function Edit() {
  const dispatch = useCanvasDispatchContext();

  useUnmount(() => {
    dispatch({ type: 'reset' });
  });

  useQueryParams();

  useImage();

  useCanvas();

  useUiControls();

  return (
    <div className={styles.container}>
      <CanvasComponent />
      <div className={styles.actions}>
        <ZoomComponent />
        <Divider />

        <SizeComponent />
        <Divider />

        <GrayscaleComponent />
        <Divider />

        <BlurComponent />
        <Divider />

        <DownloadComponent />
        <Divider />

        <Link className={styles.link} href="/">
          Back to search results
        </Link>
      </div>
    </div>
  );
}
