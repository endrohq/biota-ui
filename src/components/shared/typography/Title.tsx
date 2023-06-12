import clsx from 'clsx';
import React from 'react';

type TitleProps = {
  color?: 'primary' | 'primary-lighter' | 'secondary' | 'secondary-lighter';
  as?: React.ElementType;
  weight?: 'extalight' | 'light' | 'regular' | 'medium' | 'bold' | 'black';
  className?: string;
  id?: string;
} & (
  | { children: React.ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string;
      };
    }
);

const fontSize = {
  h1: 'text-3xl md:text-4xl leading-tight ',
  h2: 'text-2xl md:text-3xl leading-tight ',
  h3: 'text-xl md:text-2xl',
  h4: 'text-lg md:text-xl',
  h5: 'text-md md:text-lg',
  h6: 'text-base md:text-md',
};

const titleColors = {
  primary: 'text-primary-500',
  'primary-lighter': 'text-primary-400',
  secondary: 'text-primary-300',
  'secondary-lighter': 'text-primary-200',
};

const fontWeight = {
  extalight: 'font-extalight',
  light: 'font-light',
  regular: 'font-regular',
  medium: 'font-medium',
  bold: 'font-bold',
  black: 'font-black',
};

function Title({
  color = 'primary',
  size,
  as,
  weight = 'bold',
  className,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size;
  return (
    <Tag
      className={clsx(
        fontSize[size],
        titleColors[color],
        fontWeight[weight],
        className,
      )}
      {...rest}
    />
  );
}

export function H1(props: TitleProps) {
  return <Title {...props} size="h1" />;
}

export function H2(props: TitleProps) {
  return <Title {...props} size="h2" />;
}

export function H3(props: TitleProps) {
  return <Title {...props} size="h3" />;
}

export function H4(props: TitleProps) {
  return <Title {...props} size="h4" />;
}

export function H5(props: TitleProps) {
  return <Title {...props} size="h5" />;
}

export function H6(props: TitleProps) {
  return <Title {...props} size="h6" />;
}
