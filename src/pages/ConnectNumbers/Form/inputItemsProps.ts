import { InputProps } from '../../../components';

export const inputItemsProps: InputProps[] = [
  {
    placeholder: 'Иванов Иван Иванович',
    type: 'text',
    label: 'name',
    labelTag: 'Фамилия Им:  Отчество',
    rules: {
      required: 'Укажите ФИО',
      minLength: { value: 10, message: 'Минимум 10 символов' },
    },
  },
  {
    type: 'number',
    min: '1',
    max: '100',
    label: 'age',
    labelTag: 'Ваш возраст',
    rules: {
      required: 'Укажите возраст',
      valueAsNumber: true,
      min: { value: 0, message: 'Некорректный возраст' },
      max: { value: 100, message: 'Некорректный возраст' },
    },
  },
  {
    placeholder: 'example@gmail.com',
    type: 'email',
    label: 'email',
    labelTag: 'E-mail',
    rules: {
      minLength: { value: 6, message: 'Минимум 6 символов' },
      required: 'Укажите почту',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Неверный формат',
      },
    },
  },
  {
    type: 'tel',
    label: 'phone',
    labelTag: 'Номер телефона*',
    rules: {
      minLength: { value: 10, message: 'Минимум 10 символов' },
      maxLength: { value: 10, message: 'Максимум 10 символов' },
    },
  },
];
