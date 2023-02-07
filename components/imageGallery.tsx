import { EditFilled } from '@ant-design/icons';
import styles from '@podenco/styles/Home.module.css';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export interface APIImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const generateAspectRatio = (link: string) => {
  const [width, height] = link.split('/').slice(-2);
  if (+width > 700) {
    return `700/${Math.floor((700 / +width) * +height)}`;
  }
  return `${width}/${height}`;
};

export default function ImageGallery({ data }: { data: APIImage[] | null }) {
  return (
    <div className={styles.imageGallery}>
      {data &&
        data.map((item, i) => {
          const aspectRatio = generateAspectRatio(item.download_url);
          return (
            <div className={styles.imageGallery__item} key={item.id}>
              <div className={styles.imageGallery__imageContainer}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/id/${item.id}/${aspectRatio}`}
                  alt="gallery image"
                  fill
                  priority={i < 1}
                  sizes="(max-width: 768px) 100vw,
                            (max-width: 1100px) 50vw,
                            33vw"
                ></Image>
              </div>
              <div className={styles.imageGallery__title}>
                <span>{item.author} </span>
                <Link href={`/edit/${item.id}`}>
                  <Button className={styles.imageContainer__Button}>
                    <EditFilled />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}
