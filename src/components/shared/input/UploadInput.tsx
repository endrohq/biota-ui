import { CameraOutlined } from '@shared/components/icons/CameraOutlined';
import { TrashOutlined } from '@shared/components/icons/TrashOutlined';
import { isArrayWithElements } from '@shared/utils/array.utils';
import React from 'react';

interface UploadComponentProps {
  images: File[] | undefined;
  onChange(images: File[]): void;
}

function UploadInput({ images, onChange }: UploadComponentProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onChange([...(images || []), ...newFiles]);
    }

    // Clear the input's value
    if (e.target) {
      e.target.value = '';
    }
  };

  function handleRemoveByIndex(index: number) {
    onChange(images?.filter((_, i) => i !== index) || []);
  }

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="bg-transition flex w-full cursor-pointer items-center space-x-4 rounded border border-dashed border-gray-300 bg-gray-50/50 p-4 hover:bg-gray-100"
      >
        <div className="rounded bg-gray-100 p-2">
          <CameraOutlined className="text-2xl " />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">Upload images</div>
          <div className="text-xs text-gray-500">PNG or JPG (max. 2MB)</div>
        </div>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="mt-4 w-full">
        {isArrayWithElements(images) ? (
          images?.map((image, index) => (
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CameraOutlined className="" />
                <div className="text-sm">{image.name}</div>
              </div>
              <TrashOutlined
                onClick={() => handleRemoveByIndex(index)}
                className=" cursor-pointer rounded text-gray-600 hover:text-red-800"
              />
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No images uploaded</div>
        )}
      </div>
    </div>
  );
}

export default UploadInput;
