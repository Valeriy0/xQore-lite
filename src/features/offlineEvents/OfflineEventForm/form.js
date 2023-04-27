import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isExists } from 'date-fns';

const schema = yup.object({
  title: yup.string(),
  description: yup.string().max(255),
  organizer_id: yup.string().required('Organizer id is a required field'),
  tg_username: yup.string(),
  country: yup.string().required('Country is a required field'),
  address: yup.string().required('Address is a required field'),
  map_url: yup.string().test('check url', 'Map url must be a valid url', (value) => {
    if (!value) return true;

    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }),
  timezone: yup.string().required('Timezone is a required field'),
  time: yup
    .string()
    .required('Time is a required field')
    .test('valid time length', 'Invalid time', (value) => {
      return value?.match(/\d+/g)?.join('')?.length === 4;
    }),
  date: yup.string().required('Date is a required field'),
  language: yup.string().required('Language is a required field'),
  invitation_image: yup.string(),
  expected_guests_number: yup.string().required('Expected guests is a required field'),
});

export const formScheme = {
  initialScheme: {
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  },
};
