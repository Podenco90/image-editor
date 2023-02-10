import { APIImage } from '@podenco/components/imageGallery';
import { appStore } from '@podenco/state/app';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { usePrevious } from 'react-use';

export default function useImageList() {
  const router = useRouter();
  const { page } = appStore((state) => state.params);
  const [data, setData] = useState<APIImage[] | null>(null);

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

  return data;
}
