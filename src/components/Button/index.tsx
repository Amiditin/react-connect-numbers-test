import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button: React.FC<ButtonProps> = ({ children, className, ...buttonProps }) => {
  return (
    <button {...buttonProps} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
