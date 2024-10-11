
// import { FormValues } from '@/Types/types';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Resolver } from 'react-hook-form';
import * as yup from 'yup';

// import { validateAddress } from "./validateAdress";
export const getValidationSchema = (name:string) => {
    switch (name) {
      case 'age':
        return yup
          .number()
          .typeError('Возраст должен быть числом')
          .integer('Возраст должен быть целым числом')
          .min(0, 'Минимальный возраст 0 лет')
          .max(17, 'Максимальный возраст 17 лет')
       
      case 'address':
        return yup
          .string()
        //   .test('validateAddress', 'Поиск доступен только в городе Санкт-Петербург', validateAddress);
      default:
        return yup.string();
    }
  };

  export const schema = yup.object({
    age: yup
      .number()
      .transform((value, originalValue) => {
        // Если значение пустая строка, возвращаем undefined
        return originalValue === '' ? undefined : value;
      })
      .typeError('Возраст должен быть числом')
      .integer('Возраст должен быть целым числом')
      .min(0, 'Минимальный возраст 0 лет')
      .max(17, 'Максимальный возраст 17 лет'),
      address: yup.string(),
      // modeWork: yup.array().of(yup.string()),
      modeWork: yup
      .array()
      .of(yup.string())
      .ensure() // Убедитесь, что значение всегда будет массивом, даже если оно пустое
      .typeError('modeWork must be an array'),
      sports: yup.array().of(yup.string()),
      weekdayTimes: yup.array().of(yup.string()),
    // Другие поля формы...
  });

  // export const formResolver: Resolver<FormValues, any> = yupResolver(schema);