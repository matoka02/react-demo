import { createSlice, PayloadAction, ActionReducerMapBuilder, Action } from '@reduxjs/toolkit';

import {
  addCustomer,
  deleteCustomer,
  fetchAllCustomers,
  fetchCustomerById,
  // fetchFilteredCustomers,
  updateCustomer,
} from './customerThunk';

import { ICustomer, INewCustomer } from '@/stores/types/modelTypes';

interface CustomerState {
  customers: ICustomer[];
  customer: INewCustomer | null;
  isLoading: boolean;
  error?: string;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
  // searchOpen: boolean;
  // search: {
  //   firstName: string;
  //   lastName: string;
  // };
}

const initialState: CustomerState = {
  customers: [],
  customer: null,
  isLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
  // searchOpen: false,
  // search: {
  //   firstName: '',
  //   lastName: '',
  // },
};

// pending
const handleCustomerPending = (state: CustomerState) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

// All customers
const handleFetchAllCustomersFulfilled = (
  state: CustomerState,
  action: PayloadAction<ICustomer[]>
) => ({
  ...state,
  isLoading: false,
  customers: action.payload,
});
const handleFetchAllCustomersRejected = (state: CustomerState, action: PayloadAction<any>) => ({
  ...state,
  isLoading: false,
  error: action.payload,
  snackbar: {
    open: true,
    message: action.payload,
    severity: 'error' as const,
  },
});

// Customer by ID
const handleFetchCustomerByIdFulfilled = (
  state: CustomerState,
  action: PayloadAction<ICustomer>
) => ({
  ...state,
  isLoading: false,
  customers: [...state.customers, action.payload],
});
const handleFetchCustomerByIdRejected = (
  state: CustomerState,
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

// // Find customers
// const handleFilteredCustomersFulfilled = (
//   state: CustomerState,
//   action: PayloadAction<ICustomer[]>
// ) => ({
//   ...state,
//   isLoading: false,
//   customers: action.payload,
//   snackbar:{
//     open: action.payload.length === 0 ? true : state.snackbar.open,
//     message: action.payload.length === 0 ? 'No customers found' : state.snackbar.message,
//     severity: action.payload.length === 0 ? ('warning' as const) : state.snackbar.severity,
//   }
// });
// const handleFilteredCustomersRejected = (
//   state: CustomerState,
//   action: PayloadAction<string | undefined>
// ) => ({
//   ...state,
//   isLoading: false,
//   error: action.payload,
//   snackbar:{
//     open: true ,
//     message: action.payload ?? 'Unknown error',
//     severity: action.payload === 'No customers found' ? ('warning' as const) : ('error' as const),
//   }
// });

// Delete customer
const handleDeleteCustomerFulfilled = (state: CustomerState, action: PayloadAction<number>) => ({
  ...state,
  isLoading: false,
  customers: state.customers.filter((customer) => customer.id !== String(action.payload)),
  snackbar: {
    open: true,
    message: `Customer id:${action.payload} deleted successfully!`,
    severity: 'success' as const,
  },
});
const handleDeleteCustomerRejected = (
  state: CustomerState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `Error: ${action.payload}`,
    severity: 'error' as const,
  },
});

// Add customer
const handleAddCustomerFulfilled = (state: CustomerState, action: PayloadAction<ICustomer>) => ({
  ...state,
  isLoading: false,
  customers: [...state.customers, action.payload],
  snackbar: {
    open: true,
    message: `Customer added successfully!`,
    severity: 'success' as const,
  },
});
const handleAddCustomerRejected = (
  state: CustomerState,
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

// Update customer
const handleUpdateCustomerFulfilled = (state: CustomerState, action: PayloadAction<ICustomer>) => ({
  ...state,
  isLoading: false,
  customers: state.customers.map((customer) =>
    customer.id === action.payload.id ? action.payload : customer
  ),
  snackbar: {
    open: true,
    message: `Customer id:${action.payload.id} updated successfully!`,
    severity: 'success' as const,
  },
});
const handleUpdateCustomerRejected = (
  state: CustomerState,
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

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: 'success' | 'error' | 'warning' | 'info';
      }>
    ) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CustomerState>) => {
    builder
      // All customers
      .addCase(fetchAllCustomers.fulfilled, handleFetchAllCustomersFulfilled)
      .addCase(fetchAllCustomers.rejected, handleFetchAllCustomersRejected)
      // Customer by ID
      .addCase(fetchCustomerById.fulfilled, handleFetchCustomerByIdFulfilled)
      .addCase(fetchCustomerById.rejected, handleFetchCustomerByIdRejected)
      // // Find customers
      // .addCase(fetchFilteredCustomers.fulfilled, handleFilteredCustomersFulfilled)
      // .addCase(fetchFilteredCustomers.rejected, handleFilteredCustomersRejected)
      // Delete customer
      .addCase(deleteCustomer.fulfilled, handleDeleteCustomerFulfilled)
      .addCase(deleteCustomer.rejected, handleDeleteCustomerRejected)
      // Add customer
      .addCase(addCustomer.fulfilled, handleAddCustomerFulfilled)
      .addCase(addCustomer.rejected, handleAddCustomerRejected)
      // Update customer
      .addCase(updateCustomer.fulfilled, handleUpdateCustomerFulfilled)
      .addCase(updateCustomer.rejected, handleUpdateCustomerRejected)
      // pending
      .addMatcher((action: Action) => action.type.endsWith('/pending'), handleCustomerPending);
  },
});

export const CUSTOMER_DURATION = 3000;
export const {
  // clearError,
  // setSearchOpen,
  // setSearch,
  showSnackbar,
  hideSnackbar,
} = customerSlice.actions;
export default customerSlice.reducer;
