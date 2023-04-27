import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  alias: yup.string(),
});

export const formScheme = {
  initialScheme: {
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  },
};
