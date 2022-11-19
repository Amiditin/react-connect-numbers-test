import React, { SyntheticEvent } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { FormError } from '../FormError';

import { IConnectNumbersForm } from '../../pages/ConnectNumbers/types';

export interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
  clearButton?: boolean;
  label: keyof IConnectNumbersForm;
  labelTag?: React.ReactNode;
  rules?: RegisterOptions;
}

export const Input: React.FC<InputProps> = ({
  className,
  clearButton = true,
  label,
  labelTag,
  rules,
  ...inputProps
}) => {
  const [value, setValue] = React.useState('');
  const {
    register,
    formState: { errors },
  } = useFormContext<IConnectNumbersForm>();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputProps.type !== 'tel') {
      setValue(e.target.value);
      return;
    }

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
      {labelTag && (
        <label className={styles.label} htmlFor={label}>
          {labelTag}
        </label>
      )}
      <div className={clsx(styles.input, inputProps.type === 'tel' && styles.inputTel)}>
        <input
          {...inputProps}
          {...register(label, rules)}
          className={className}
          value={value}
          onChange={handleChangeInput}
          id={label}
        />
        {clearButton && value && (
          <img
            className={styles.clearIcon}
            src="/images/tool-icons/close.svg"
            alt="clear"
            onClick={() => setValue('')}
          />
        )}
        <FormError error={errors[label]} />
      </div>
    </div>
  );
};
