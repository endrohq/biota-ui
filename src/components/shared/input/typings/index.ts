import * as React from 'react';

export interface BaseInputProps<T>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'className'
  > {
  value: T | undefined;
  onChange(value: T): void;
  loading?: boolean;
  isValid?: boolean;
  validator?: (value: T) => Promise<void>;
  validatorWaitFor?: number;
  icon?: JSX.Element;
  wrapperClassName?: string;
  className?: string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const KeyCode = {
  ENTER: 13,
  UP: 38, // also NUM_NORTH
  DOWN: 40, // also NUM_SOUTH
};
