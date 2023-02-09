import { APIImage } from '@podenco/components/imageGallery';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { usePrevious } from 'react-use';

export default function useImageList({
  page,
  setParams,
  data,
  setData,
}: {
  page: number | null | undefined;
  setParams: (keyVal: Record<string, string>) => void;
  data: APIImage[] | null;
  setData: Dispatch<SetStateAction<APIImage[] | null>>;
}) {
  const router = useRouter();
  const previousPage = usePrevious(page);

  useQuery({
    queryKey: ['images', page],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v2/list/?page=${page ?? 1}`);
      const imgData = await res.json();
      setData(imgData);
      return imgData;
    },
    enabled: router.isReady && page !== undefined && page !== null && previousPage !== page,
  });

  useEffect(() => {
    if (router.isReady && page === null) {
      setParams({ page: '1' });
      return;
    }
  }, [data, page, router.isReady, setParams]);
}
