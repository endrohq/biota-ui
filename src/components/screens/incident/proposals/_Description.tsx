import { Paragraph } from '@shared/components/typography/Paragraph';
import { H6 } from '@shared/components/typography/Title';

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  return (
    <div>
      <H6 className="text-gray-700">Summary</H6>
      <Paragraph className="w-11/12 text-sm text-gray-800">
        {description}
      </Paragraph>
    </div>
  );
}
