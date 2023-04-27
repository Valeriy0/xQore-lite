import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { routerReducer } from './routerSlice';

const reducer = combineReducers({
  profile: userReducer,
  router: routerReducer,
});

const initializeStore = (initialState) =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
      }),
    preloadedState: initialState,
  });

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export const getOrCreateStore = (initialState) => {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
};
