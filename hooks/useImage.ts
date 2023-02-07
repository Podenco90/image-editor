import { canvasStore } from '@podenco/state/canvas';
import { useRouter } from 'next/router';
import { useAsync } from 'react-use';

export default function useImage() {
  const setSrcImgWidth = canvasStore((state) => state.setSrcImgWidth);
  const setSrcImgHeight = canvasStore((state) => state.setSrcImgHeight);
  const setSrcImg = canvasStore((state) => state.setSrcImg);
  const setSrcImgAspectRatio = canvasStore((state) => state.setSrcImgAspectRatio);
  const setAspectRatio = canvasStore((state) => state.setAspectRatio);
  const router = useRouter();

  useAsync(async () => {
    if (router.query.slug === undefined || !router.isReady) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/id/${router.query.slug}/info`);

    const { download_url: downloadUrl } = await res.json();

    const imgElement = new Image();

    if (downloadUrl) {
      imgElement.src = downloadUrl;
    }

    imgElement.crossOrigin = 'anonymous';

    imgElement.onload = () => {
      setSrcImgWidth(imgElement.naturalWidth);
      setSrcImgHeight(imgElement.naturalHeight);
      setSrcImg(imgElement);
      setSrcImgAspectRatio(imgElement.naturalWidth / imgElement.naturalHeight);
      setAspectRatio(imgElement.naturalWidth / imgElement.naturalHeight);
    };
  }, [router.isReady, router.query.slug]);
}
