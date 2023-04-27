import { yupResolver } from '@hookform/resolvers/yup';
import { isExists } from 'date-fns';
import * as yup from 'yup';

const schema = yup.object({
  subject: yup.string().required(),
  description: yup.string(),
  budget: yup.number().positive(),
  amount: yup.number().required().positive(),
  date_start: yup
    .string()
    .required()
    .test('valid date', 'invalid date', (value) => {
      const [year, month, day] = value
        ?.split('.')
        ?.reverse()
        ?.map((i) => Number(i));

      return value && isExists(year - 1, month - 1, day);
    }),
  date_end: yup
    .string()
    .required()
    .test('valid date', 'invalid date', (value) => {
      const [year, month, day] = value
        ?.split('.')
        ?.reverse()
        ?.map((i) => Number(i));

      return value && isExists(year - 1, month - 1, day);
    }),
  is_global: yup.boolean(),
});

export const formScheme = {
  initialScheme: {
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  },
};
