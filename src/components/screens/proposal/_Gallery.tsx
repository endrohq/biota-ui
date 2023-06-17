import { useEffect, useState } from 'react';

import { useStorage } from '../../../hooks/useStorage';

interface GalleryProps {
  cid: string;
}

export function Gallery({ cid }: GalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const { getImageUrls } = useStorage();

  useEffect(() => {
    const getImages = async () => {
      try {
        const urls = await getImageUrls(cid);
        setImages(urls);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [cid]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt="Proposal"
          style={{ width: '10em', height: '10em' }}
        />
      ))}
    </div>
  );
}
