import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().max(10, 'NickName must be at most 10 characters'),
  email: yup.string().email(),
  telegram: yup.string(),
  tron_user_id: yup.string(),
  ethereum_user_id: yup.string(),
});

export const formScheme = {
  initialScheme: {
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  },
};
