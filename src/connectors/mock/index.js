import { createMainMocks } from './main';
import { createAccountMocks } from './account';

const passThrough = (mock) => {
  mock.onAny().passThrough();
};

export const createMocks = (mock) => {
  createMainMocks(mock);
  createAccountMocks(mock);
  passThrough(mock);
};
