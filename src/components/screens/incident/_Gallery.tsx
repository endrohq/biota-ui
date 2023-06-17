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

  const showAllImages = () => {
    // Functionality to show all images
  };

  return (
    <div className="flex h-72 flex-wrap overflow-hidden ">
      {images.slice(0, 1).map((url, index) => (
        <div key={index} className="h-full w-1/2 overflow-hidden rounded">
          <img
            src={url}
            alt="incident image"
            className="h-full w-full  object-cover object-center"
          />
        </div>
      ))}
      {images.slice(1, 5).map((url, index) => (
        <div key={index} className="w-1/4">
          <img
            src={url}
            alt="incident image"
            className="h-[50%] w-full rounded object-cover"
          />
        </div>
      ))}
      {images.length > 5 && (
        <button
          onClick={showAllImages}
          className="m-4 rounded-md bg-blue-500 px-6 py-2 text-white"
        >
          Show all images
        </button>
      )}
    </div>
  );
}
