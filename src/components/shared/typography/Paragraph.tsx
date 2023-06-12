import clsx from 'clsx';
import React from 'react';

type ParagraphProps = {
  className?: string;
  textColorClassName?: string;
  as?: React.ElementType;
} & (
  | { children: React.ReactNode }
  | { dangerouslySetInnerHTML: { __html: string } }
);

export function Paragraph({
  className,
  as = 'p',
  textColorClassName = 'text-primary',
  ...rest
}: ParagraphProps) {
  return React.createElement(as, {
    className: clsx('max-w-full', textColorClassName, className),
    ...rest,
  });
}
