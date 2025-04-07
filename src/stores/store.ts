import { configureStore } from '@reduxjs/toolkit';

import agentReducer from './agents/agentSlice';
import customerReducer from './customers/customerSlice';
import orderReducer from './orders/orderSlice';

export const store = configureStore({
  reducer: {
    agents: agentReducer,
    customers: customerReducer,
    orders: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
