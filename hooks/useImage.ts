import { canvasStore } from '@podenco/state/canvas';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useImage() {
  const setSrcImgWidth = canvasStore((state) => state.setSrcImgWidth);
  const setSrcImgHeight = canvasStore((state) => state.setSrcImgHeight);
  const setSrcImg = canvasStore((state) => state.setSrcImg);
  const setSrcImgAspectRatio = canvasStore((state) => state.setSrcImgAspectRatio);
  const setAspectRatio = canvasStore((state) => state.setAspectRatio);
  const router = useRouter();

  useQuery({
    queryKey: ['image', router.query.slug],
    queryFn: async () => {
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
    },
    enabled: router.query.slug !== undefined && router.isReady,
  });
}
