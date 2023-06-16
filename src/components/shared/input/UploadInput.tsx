import { CameraOutlined } from '@shared/components/icons/CameraOutlined';
import React, { useState } from 'react';

interface UploadComponentProps {
  // any props that come into the component
}

const UploadInput: React.FC<UploadComponentProps> = (
  props: UploadComponentProps,
) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="bg-transition flex w-full cursor-pointer flex-col items-center space-y-2 rounded border border-gray-200 bg-gray-50 py-10 text-gray-500 hover:bg-gray-100"
      >
        <CameraOutlined className="text-3xl " />
        <div className="">Upload images</div>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="flex flex-wrap justify-center">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="m-1 overflow-hidden rounded-md border"
            style={{ width: '10rem', height: '10rem' }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadInput;
