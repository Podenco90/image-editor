import styles from '@podenco/styles/Home.module.css';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export default function SearchAction({
  page,
  setParams,
}: {
  page: string | null | undefined;
  setParams: (keyVal: Record<string, string>) => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.actions}>
      <Button
        disabled={page !== null && page !== undefined ? !(+page > 1) : false}
        onClick={() => page !== null && page !== undefined && setParams({ page: `${+page - 1}` })}
      >
        &lt;&lt;
      </Button>
      <div className={styles.actions__description}>Current Page: {router.query.page}</div>
      <Button
        onClick={() => page !== null && page !== undefined && setParams({ page: `${+page + 1}` })}
      >
        &gt;&gt;
      </Button>
    </div>
  );
}
