import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { Category } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';
import { Hash } from 'viem';

const objections = [
  {
    id: 1,
    category: Category.MOBILITY,
    objection:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus, diam vitae fermentum imperdiet, tellus enim porta eros, eget commodo mi risus at mi. Aliquam luctus fermentum dolor, ac vestibulum arcu commodo sit amet. Sed auctor iaculis fermentum. Nunc eleifend, erat eu dictum convallis, magna eros ultrices mi, id pharetra neque nisl vitae nisl. Aenean nec urna dui. Vestibulum non mauris sagittis, auctor magna euismod, feugiat elit. Vestibulum posuere lectus risus, eget faucibus est interdum et. Praesent eu elementum quam, at suscipit nulla. In luctus augue in imperdiet eleifend. Duis tellus nibh, bibendum ac urna in, scelerisque molestie risus. Cras scelerisque ipsum at porttitor consectetur. Donec et sodales quam. Duis blandit lobortis consequat. Proin eu orci urna.',
    author: '0x1234567890123456789012345678901234567890' as Hash,
  },
  {
    id: 2,
    category: Category.MOBILITY,
    objection:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus, diam vitae fermentum imperdiet, tellus enim porta eros, eget commodo mi risus at mi. Aliquam luctus fermentum dolor, ac vestibulum arcu commodo sit amet. Sed auctor iaculis fermentum. Nunc eleifend, erat eu dictum convallis, magna eros ultrices mi, id pharetra neque nisl vitae nisl. Aenean nec urna dui. Vestibulum non mauris sagittis, auctor magna euismod, feugiat elit.',
    author: '0x22f6cc8738308a8c92a6a71ea67832463d1fec0d' as Hash,
  },
];

export function Objections() {
  return (
    <div className="mt-10 space-y-4">
      <div className="flex justify-between space-x-6">
        <div className="space-y- w-4/12">
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
        </div>
        <div className="w-8/12">
          {objections?.map(objection => (
            <div className="mt-4 space-y-4 rounded border-b border-gray-100 bg-white p-8 last:border-0">
              <div className=" flex items-center justify-between ">
                <div className="flex items-center space-x-4">
                  <EthAddressIcon size="large" address={objection.author} />
                  <div>
                    <div className="text-sm font-medium">
                      {getShortenedFormat(objection.author)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date().toDateString()}
                    </div>
                  </div>
                </div>
                <div className="mb-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-500">
                  {objection.category}
                </div>
              </div>
              <Paragraph className="text-sm leading-loose text-gray-600">
                {objection.objection}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
