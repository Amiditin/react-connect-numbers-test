import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../../components';
import { IConnectNumbersForm } from '../types';
import styles from './Form.module.scss';

interface FormProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<IConnectNumbersForm>;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IConnectNumbersForm>({ mode: 'onBlur' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.questionnaire}>
        <h4 className={styles.title}>Анкета:</h4>
        <div className={styles.inputs}>
          <Input<IConnectNumbersForm>
            placeholder="Иванов Иван Иванович"
            type="text"
            label="name"
            labelTag="Фамилия Имя Отчество"
            register={register}
            error={errors.name}
            rules={{
              required: 'Укажите ФИО',
              minLength: { value: 10, message: 'Минимум 10 символов' },
            }}
          />
          <Input<IConnectNumbersForm>
            type="number"
            min="1"
            max="100"
            label="age"
            labelTag="Ваш возраст"
            register={register}
            error={errors.age}
            rules={{
              required: 'Укажите возраст',
              min: { value: 0, message: 'Некорректный возраст' },
              max: { value: 100, message: 'Некорректный возраст' },
            }}
          />
          <Input<IConnectNumbersForm>
            placeholder="example@gmail.com"
            type="email"
            label="email"
            labelTag="E-mail"
            register={register}
            error={errors.email}
            rules={{
              minLength: { value: 6, message: 'Минимум 6 символов' },
              required: 'Укажите почту',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Неверный формат',
              },
            }}
          />
          <Input<IConnectNumbersForm>
            type="tel"
            label="phone"
            labelTag="Номер телефона*"
            register={register}
            error={errors.phone}
            rules={{
              minLength: { value: 10, message: 'Минимум 10 символов' },
              maxLength: { value: 10, message: 'Максимум 10 символов' },
            }}
          />
        </div>
        <p className={styles.mechanic}>
          <b>Механика:</b> соедините последовательно цифры от 1 до 25, кликая на них мышкой как
          можно быстрее. Всего необходимо пройти 4 теста в строгом порядке. Также не рекомендуется
          проходить тест в состоянии утомления, т.к. это может ухудшать результат.
        </p>
      </div>
      {children}
    </form>
  );
};
