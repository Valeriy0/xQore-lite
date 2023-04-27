import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRepository } from 'connectors/repositories/user';
import { AuthRepository } from 'connectors/repositories/auth';
import { NotificationRepository } from 'connectors/repositories/notification';

export const getProfile = createAsyncThunk('profile/getProfile', async (account) => {
  const search = await UserRepository.search({ column: 'address', value: account });
  const settings = await UserRepository.getSettings();

  if (search?.id !== settings?.id) {
    return {
      ...search,
    };
  }

  return {
    ...search,
    ...settings,
  };
});

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  return await AuthRepository.check();
});

export const getNotifications = createAsyncThunk('profile/getNotifications', async (payload) => {
  return await NotificationRepository.getNotifications({ user: payload });
});

export const actualizeNotifications = createAsyncThunk('profile/actualizeNotifications', async (payload) => {
  return await NotificationRepository.actualize({ user: payload });
});
