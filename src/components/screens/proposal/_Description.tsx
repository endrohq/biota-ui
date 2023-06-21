import { Paragraph } from '@shared/components/typography/Paragraph';
import { H6 } from '@shared/components/typography/Title';

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  return (
    <div>
      <H6 className="mb-2 text-gray-700">Proposal Summary</H6>
      <Paragraph className="w-9/12 text-sm text-gray-700">
        {description}
      </Paragraph>
    </div>
  );
}
