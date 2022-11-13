import React from 'react';
import styles from './Input.module.scss';
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormError } from '../FormError';
import clsx from 'clsx';

export interface InputProps<T extends FieldValues>
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  clearButton?: boolean;
  error?: FieldError;
  label: Path<T>;
  labelTag?: React.ReactNode;
  register: UseFormRegister<T>;
  rules?: RegisterOptions;
}

export const Input = <T extends FieldValues>(props: InputProps<T>): React.ReactElement => {
  const [value, setValue] = React.useState('');

  const {
    className,
    clearButton = true,
    error,
    label,
    labelTag,
    register,
    rules,
    ...inputReactProps
  } = props;

  // console.log(label, { label: value });

  const handleChangePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const autoEnterValueReg = /\+(7|8)\d+$/;

    if (autoEnterValueReg.test(e.target.value)) {
      setValue(e.target.value.slice(2));
      return;
    }

    const onlyNumbersReg = /^\d+$/;

    if (e.target.value && (!onlyNumbersReg.test(e.target.value) || e.target.value.length > 10)) {
      return;
    }

    setValue(e.target.value);
  };

  return (
    <div className={styles.inner}>
      <label className={styles.label} htmlFor={label}>
        {labelTag}
      </label>
      {props.type === 'tel' ? (
        <div className={styles.phone}>
          <span className={styles.prefix}>+7</span>
          <input
            {...inputReactProps}
            {...register(label, rules)}
            className={clsx(styles.input, className)}
            value={value}
            onChange={handleChangePhoneInput}
            id={label}
          />
        </div>
      ) : (
        <input
          {...inputReactProps}
          {...register(label, rules)}
          className={clsx(styles.input, className)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={label}
        />
      )}
      {clearButton && value && (
        <img
          className={clsx(styles.clearIcon, labelTag && styles.clearIconWithLabel)}
          src="/images/tool-icons/close.svg"
          alt="clear"
          onClick={() => setValue('')}
        />
      )}
      {error && <FormError error={error} />}
    </div>
  );
};
