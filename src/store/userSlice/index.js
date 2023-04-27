import { createSlice } from '@reduxjs/toolkit';
import { getProfile, checkAuth, getNotifications, actualizeNotifications } from './asyncActions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    authUser: {},
    notifications: {
      events: [],
    },
    previewAccount: {},
    accountBalance: {
      isFirstLoaded: false,
    },
  },
  reducers: {
    setBalance(state, action) {
      state.accountBalance = action.payload;
    },
    setPreviewAccount(state, action) {
      state.previewAccount = action.payload;
    },
    updateCurrentUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    clearAuthUser(state) {
      state.authUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actualizeNotifications.fulfilled, (state) => {
        state.notifications.new = 0;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = { ...state.notifications, ...action.payload, isLoading: false };
      })
      .addCase(getNotifications.pending, (state, action) => {
        state.notifications = { ...state.notifications, ...action.payload, isLoading: true };
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.notifications = { ...action.payload, isLoading: false };
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload, isLoading: false };
      })
      .addCase(getProfile.pending, (state, action) => {
        // Add user to the state array
        state.currentUser = { ...state.currentUser, ...action.payload, isLoading: true };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.currentUser = { ...action.payload, isLoading: false };
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = { ...action.payload, isLoading: false };
      })
      .addCase(checkAuth.pending, (state, action) => {
        // Add user to the state array
        state.authUser = { ...action.payload, isLoading: true };
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.authUser = { error: action.payload, isLoading: false };
      });
  },
});

export const userReducer = userSlice.reducer;

export const { setBalance, clearAuthUser, updateCurrentUser, setPreviewAccount } = userSlice.actions;
