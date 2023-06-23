import { Button } from '@shared/components/button';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H3 } from '@shared/components/typography/Title';
import { Category, IpfsObjection } from '@shared/typings';
import { useState } from 'react';
import { Hash } from 'viem';

import { CreateObjection } from './createObjection';
import { ObjectionItem } from './ObjectionItem';

const objections: IpfsObjection[] = [
  {
    category: Category.MOBILITY,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus, diam vitae fermentum imperdiet, tellus enim porta eros, eget commodo mi risus at mi. Aliquam luctus fermentum dolor, ac vestibulum arcu commodo sit amet. Sed auctor iaculis fermentum. Nunc eleifend, erat eu dictum convallis, magna eros ultrices mi, id pharetra neque nisl vitae nisl. Aenean nec urna dui. Vestibulum non mauris sagittis, auctor magna euismod, feugiat elit. Vestibulum posuere lectus risus, eget faucibus est interdum et. Praesent eu elementum quam, at suscipit nulla. In luctus augue in imperdiet eleifend. Duis tellus nibh, bibendum ac urna in, scelerisque molestie risus. Cras scelerisque ipsum at porttitor consectetur. Donec et sodales quam. Duis blandit lobortis consequat. Proin eu orci urna.',
    author: '0x1234567890123456789012345678901234567890' as Hash,
  },
  {
    category: Category.MOBILITY,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus, diam vitae fermentum imperdiet, tellus enim porta eros, eget commodo mi risus at mi. Aliquam luctus fermentum dolor, ac vestibulum arcu commodo sit amet. Sed auctor iaculis fermentum. Nunc eleifend, erat eu dictum convallis, magna eros ultrices mi, id pharetra neque nisl vitae nisl. Aenean nec urna dui. Vestibulum non mauris sagittis, auctor magna euismod, feugiat elit.',
    author: '0x22f6cc8738308a8c92a6a71ea67832463d1fec0d' as Hash,
  },
];

export function Objections() {
  const [intentionToCreateObjection, setIntentionToCreateObjection] =
    useState<boolean>(false);
  return (
    <>
      <div className="mt-6 space-y-6">
        <div className="flex justify-between">
          <div>
            <H3 className="">Forum</H3>
            <Paragraph className="w-7/12 text-sm text-gray-600">
              Showcase what you might think is positive or negative around the
              proposal. It's important to have a healthy discussion and share
              your knowledge & thoughts.
            </Paragraph>
          </div>
          <div>
            <Button onClick={() => setIntentionToCreateObjection(true)}>
              Create Objection
            </Button>
          </div>
        </div>
        <div className="flex justify-between space-x-6">
          {/* <div className="space-y- w-4/12">
          <div className="mb-4 text-xs font-medium">Categories</div>
          {Object.values(Category)
            ?.splice(0, 7)
            .map((category, index) => (
              <div
                className="mb-1 rounded bg-white px-2 py-1.5 text-xs text-gray-700"
                key={index}
              >
                <span className="font-medium">2</span> {category}
              </div>
            ))}
        </div>*/}
          <div className="w-12/12 grid grid-cols-3 gap-4">
            {objections?.map((objection, idx) => (
              <ObjectionItem objection={objection} key={idx} />
            ))}
          </div>
        </div>
      </div>

      {intentionToCreateObjection && (
        <CreateObjection close={() => setIntentionToCreateObjection(false)} />
      )}
    </>
  );
}
