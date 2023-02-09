import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface SearchParams {
  width: number | null;
  height: number | null;
  lockedAspectRatio: string | null;
  blur: number | null;
  grayscale: string | null;
  page: number | undefined;
}
type Nullable<T> = { [K in keyof T]: T[K] | null };

export default function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pushToHistory = useCallback(
    (keyVal: Record<string, string>) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...keyVal },
        },
        undefined,
        {
          shallow: true,
          scroll: true,
        },
      );
    },
    [router],
  );

  const [params, setParams] = useState<Nullable<SearchParams>>({
    width: null,
    height: null,
    lockedAspectRatio: null,
    blur: null,
    grayscale: null,
    page: undefined,
  });

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
  }, [router.isReady, searchParams]);
  return [params, pushToHistory] as const;
}
