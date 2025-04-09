import { createSlice, PayloadAction, ActionReducerMapBuilder, Action } from '@reduxjs/toolkit';

import { IOrder, INewOrder } from '@/stores/types/newModelTypes';

import {
  addOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrderById,
  // fetchFilteredOrders,
  updateOrder,
} from './orderThunk';

interface OrderState {
  orders: IOrder[];
  order: INewOrder | null;
  isLoading: boolean;
  error?: string;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: OrderState = {
  orders: [],
  order: null,
  isLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
};

// pending
const handleOrderPending = (state: OrderState) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

// All orders
const handleFetchAllOrdersFulfilled = (state: OrderState, action: PayloadAction<IOrder[]>) => ({
  ...state,
  isLoading: false,
  orders: action.payload,
});
const handleFetchAllOrdersRejected = (state: OrderState, action: PayloadAction<any>) => ({
  ...state,
  isLoading: false,
  error: action.payload,
  snackbar: {
    open: true,
    message: action.payload,
    severity: 'error' as const,
  },
});

// Order by ID
const handleFetchOrderByIdFulfilled = (state: OrderState, action: PayloadAction<IOrder>) => ({
  ...state,
  isLoading: false,
  orders: [...state.orders, action.payload],
});
const handleFetchOrderByIdRejected = (
  state: OrderState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'warning' as const,
  },
});

// // Find orders
// const handleFilteredOrdersFulfilled = (
//   state: OrderState,
//   action: PayloadAction<IOrder[]>
// ) => ({
//   ...state,
//   isLoading: false,
//   orders: action.payload,
//   snackbar:{
//     open: action.payload.length === 0 ? true : state.snackbar.open,
//     message: action.payload.length === 0 ? 'No orders found' : state.snackbar.message,
//     severity: action.payload.length === 0 ? ('warning' as const) : state.snackbar.severity,
//   }
// });
// const handleFilteredOrdersRejected = (
//   state: OrderState,
//   action: PayloadAction<string | undefined>
// ) => ({
//   ...state,
//   isLoading: false,
//   error: action.payload,
//   snackbar:{
//     open: true ,
//     message: action.payload ?? 'Unknown error',
//     severity: action.payload === 'No orders found' ? ('warning' as const) : ('error' as const),
//   }
// });

// Delete order
const handleDeleteOrderFulfilled = (state: OrderState, action: PayloadAction<string>) => ({
  ...state,
  isLoading: false,
  orders: state.orders.filter((order) => order.id !== String(action.payload)),
  snackbar: {
    open: true,
    message: `Order deleted successfully!`,
    severity: 'success' as const,
  },
});
const handleDeleteOrderRejected = (
  state: OrderState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'error' as const,
  },
});

// Add order
const handleAddOrderFulfilled = (state: OrderState, action: PayloadAction<IOrder>) => ({
  ...state,
  isLoading: false,
  orders: [...state.orders, action.payload],
  snackbar: {
    open: true,
    message: `Order added successfully!`,
    severity: 'success' as const,
  },
});
const handleAddOrderRejected = (state: OrderState, action: PayloadAction<string | undefined>) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'error' as const,
  },
});

// Update order
const handleUpdateOrderFulfilled = (state: OrderState, action: PayloadAction<IOrder>) => ({
  ...state,
  isLoading: false,
  orders: state.orders.map((order) => (order.id === action.payload.id ? action.payload : order)),
  snackbar: {
    open: true,
    message: `Order updated successfully!`,
    severity: 'success' as const,
  },
});
const handleUpdateOrderRejected = (
  state: OrderState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'error' as const,
  },
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: 'success' | 'error' | 'warning' | 'info';
      }>
    ) => ({
      ...state,
      snackbar: {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      },
    }),
    hideSnackbar: (state) => ({
      ...state,
      snackbar: {
        open: false,
        message: '',
        severity: 'info',
      },
    }),
  },
  extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
      // All orders
      .addCase(fetchAllOrders.fulfilled, handleFetchAllOrdersFulfilled)
      .addCase(fetchAllOrders.rejected, handleFetchAllOrdersRejected)
      // Order by ID
      .addCase(fetchOrderById.fulfilled, handleFetchOrderByIdFulfilled)
      .addCase(fetchOrderById.rejected, handleFetchOrderByIdRejected)
      // // Find orders
      // .addCase(fetchFilteredOrders.fulfilled, handleFilteredOrdersFulfilled)
      // .addCase(fetchFilteredOrders.rejected, handleFilteredOrdersRejected)
      // Delete order
      .addCase(deleteOrder.fulfilled, handleDeleteOrderFulfilled)
      .addCase(deleteOrder.rejected, handleDeleteOrderRejected)
      // Add order
      .addCase(addOrder.fulfilled, handleAddOrderFulfilled)
      .addCase(addOrder.rejected, handleAddOrderRejected)
      // Update order
      .addCase(updateOrder.fulfilled, handleUpdateOrderFulfilled)
      .addCase(updateOrder.rejected, handleUpdateOrderRejected)
      // pending
      .addMatcher((action: Action) => action.type.endsWith('/pending'), handleOrderPending);
  },
});

export const ORDER_DURATION = 3000;
export const { showSnackbar, hideSnackbar } = orderSlice.actions;
export default orderSlice.reducer;
