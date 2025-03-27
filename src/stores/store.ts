import { configureStore } from '@reduxjs/toolkit';

import customerReducer from './customers/customerSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
