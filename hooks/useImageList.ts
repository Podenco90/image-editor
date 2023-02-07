import { APIImage } from '@podenco/components/imageGallery';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useAsync, usePrevious } from 'react-use';

export default function useImageList({
  page,
  setParams,
  data,
  setData,
}: {
  page: string | null | undefined;
  setParams: (keyVal: Record<string, string>) => void;
  data: APIImage[] | null;
  setData: Dispatch<SetStateAction<APIImage[] | null>>;
}) {
  const router = useRouter();
  const previousPage = usePrevious(page);

  useAsync(async () => {
    if (!router.isReady || page === undefined) return;

    if (page === null) {
      setParams({ page: '1' });
      return;
    }

    if (data && previousPage === page) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v2/list/?page=${page ?? 1}`);
    const imgData = await res.json();
    setData(imgData);
  }, [data, page, router.isReady, setParams]);
}
