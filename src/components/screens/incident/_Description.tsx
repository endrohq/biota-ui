import { Paragraph } from '@shared/components/typography/Paragraph';
import { H5 } from '@shared/components/typography/Title';

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  return (
    <div>
      <H5>Description</H5>
      <Paragraph className="w-11/12 text-gray-800">{description}</Paragraph>
    </div>
  );
}
