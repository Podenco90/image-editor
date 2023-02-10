import { appStore } from '@podenco/state/app';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParams = appStore((state) => state.setParams);

  useEffect(() => {
    if (!router.isReady) return;
    const width = searchParams.get('width');
    const height = searchParams.get('height');
    const page = searchParams.get('page');
    const blur = searchParams.get('blur');
    setParams({
      width: width === null ? width : +width!,
      height: height === null ? height : +height!,
      lockedAspectRatio: searchParams.get('lockedAspectRatio'),
      blur: blur === null ? blur : +blur!,
      grayscale: searchParams.get('grayscale'),
      page: page === null ? page : +page!,
    });
  }, [router.isReady, searchParams, setParams]);
}
