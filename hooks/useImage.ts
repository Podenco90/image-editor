import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import useCanvasDispatchContext from './useCanvasDispatchContext';

export default function useImage() {
  const dispatch = useCanvasDispatchContext();
  const router = useRouter();

  useQuery({
    queryKey: ['image', router.query.slug],
    queryFn: async () => {
      console.log('running');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/id/${router.query.slug}/info`);
      const resToJson = await res.json();
      const { download_url: downloadUrl } = resToJson;

      const imgElement = new Image();

      imgElement.crossOrigin = 'anonymous';

      imgElement.onload = () => {
        console.log('here');
        dispatch({ type: 'set_src_img', payload: imgElement });
        dispatch({ type: 'set_src_img_width', payload: imgElement.naturalWidth });
        dispatch({ type: 'set_src_img_height', payload: imgElement.naturalHeight });
        dispatch({
          type: 'set_src_img_aspect_ratio',
          payload: imgElement.naturalWidth / imgElement.naturalHeight,
        });
        dispatch({
          type: 'set_aspect_ratio',
          payload: imgElement.naturalWidth / imgElement.naturalHeight,
        });
      };

      if (downloadUrl) {
        imgElement.src = downloadUrl;
      }

      // return resToJson;
    },
    enabled: router.query.slug !== undefined && router.isReady,
  });
}
