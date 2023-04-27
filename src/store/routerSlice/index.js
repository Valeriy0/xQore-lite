import { createSlice } from '@reduxjs/toolkit';

export const routerSlice = createSlice({
  name: 'router',
  initialState: {
    isLoadingRouter: false,
  },
  reducers: {
    setIsLoadingRouter(state, action) {
      state.isLoadingRouter = action.payload;
    },
  },
});

export const routerReducer = routerSlice.reducer;

export const { setIsLoadingRouter } = routerSlice.actions;
