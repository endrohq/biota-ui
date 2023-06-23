import { Button } from '@shared/components/button';
import TextArea from '@shared/components/input/TextArea';
import { Category, IpfsObjection } from '@shared/typings';
import clsx from 'clsx';
import React, { useState } from 'react';
interface CreateObjectionProps {
  create(objection: IpfsObjection): void;
}

export function ObjectionForm({ create }: CreateObjectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [content, setContent] = useState<string>('');

  function deslugify(slug: string): string {
    const words = slug.split('-');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  }

  return (
    <div className="space-y-6">
      <div>Create Objection</div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Description</div>
        <TextArea value={content} onChange={setContent} minRows={4} />
      </div>
      <div>
        <div className="mb-2 font-medium">Categories</div>
        <div className="flex flex-wrap gap-2">
          {Object.values(Category).map((category, index) => (
            <div
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                'bg-transition mb-1 cursor-pointer rounded px-2 py-1.5 text-xs',
                {
                  'text-green-700 bg-green-100': selectedCategory === category,
                  'text-gray-700 bg-gray-100 hover:bg-green-100':
                    selectedCategory !== category,
                },
              )}
              key={index}
            >
              {deslugify(category)}
            </div>
          ))}
        </div>
      </div>
      <div className="!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10">
        <Button
          fullSize
          disabled={content?.length === 0 || !selectedCategory}
          onClick={() =>
            create({ content, category: selectedCategory as Category })
          }
          className="px-6 py-2"
          variant="primary"
        >
          Create
        </Button>
      </div>
    </div>
  );
}
