import React from 'react';
import styles from './Form.module.scss';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../../../components';

import { inputItemsProps } from './inputItemsProps';
import { IConnectNumbersForm } from '../types';

interface FormProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<IConnectNumbersForm>;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const methods = useForm<IConnectNumbersForm>({ mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.questionnaire}>
          <h4 className={styles.title}>Анкета:</h4>
          <div className={styles.inputs}>
            {inputItemsProps.map((props) => (
              <Input key={props.label} {...props} />
            ))}
          </div>
          <p className={styles.mechanic}>
            <b>Механика:</b> соедините последовательно цифры от 1 до 25, кликая на них мышкой как
            можно быстрее. Всего необходимо пройти 4 теста в строгом порядке. Также не рекомендуется
            проходить тест в состоянии утомления, т.к. это может ухудшать результат.
          </p>
        </div>
        {children}
      </form>
    </FormProvider>
  );
};
