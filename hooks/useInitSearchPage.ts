import { appStore } from '@podenco/state/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useSetParams from './useSetParams';

export default function useInitSearchPage() {
  const router = useRouter();
  const setParams = useSetParams();

  const { page } = appStore((state) => state.params);

  useEffect(() => {
    if (router.isReady && page === null) {
      setParams({ page: '1' });
      return;
    }
  }, [page, router.isReady, setParams]);
}
