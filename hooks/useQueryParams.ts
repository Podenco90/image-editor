import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface SearchParams {
  width: string | null;
  height: string | null;
  lockedAspectRatio: string | null;
  blur: string | null;
  grayscale: string | null;
  page: string | undefined;
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
    setParams({
      width: searchParams.get('width'),
      height: searchParams.get('height'),
      lockedAspectRatio: searchParams.get('lockedAspectRatio'),
      blur: searchParams.get('blur'),
      grayscale: searchParams.get('grayscale'),
      page: searchParams.get('page'),
    });
  }, [router.isReady, searchParams]);
  return [params, pushToHistory] as const;
}
