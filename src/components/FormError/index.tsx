import React from 'react';
import styles from './FormError.module.scss';
import { FieldError } from 'react-hook-form';

interface FormErrorProps {
  error: FieldError;
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <span className={styles.error}>
      <img src="/images/tool-icons/error.svg" alt="error" />
      {error.message}
    </span>
  );
};
