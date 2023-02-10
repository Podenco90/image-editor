import { appStore } from '@podenco/state/app';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function useSetParams() {
  const router = useRouter();

  const setParams = useCallback(
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

  return setParams;
}
