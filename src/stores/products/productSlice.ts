import { createSlice, PayloadAction, ActionReducerMapBuilder, Action } from '@reduxjs/toolkit';

import { IProduct, INewProduct } from '@/stores/types/newModelTypes';

import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductById,
  // fetchFilteredProducts,
  updateProduct,
} from './productThunk';

interface ProductState {
  products: IProduct[];
  product: INewProduct | null;
  isLoading: boolean;
  error?: string;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
};

// pending
const handleProductPending = (state: ProductState) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

// All products
const handleFetchAllProductsFulfilled = (
  state: ProductState,
  action: PayloadAction<IProduct[]>
) => ({
  ...state,
  isLoading: false,
  products: action.payload,
});
const handleFetchAllProductsRejected = (state: ProductState, action: PayloadAction<any>) => ({
  ...state,
  isLoading: false,
  error: action.payload,
  snackbar: {
    open: true,
    message: action.payload,
    severity: 'error' as const,
  },
});

// Product by ID
const handleFetchProductByIdFulfilled = (state: ProductState, action: PayloadAction<IProduct>) => ({
  ...state,
  isLoading: false,
  products: [...state.products, action.payload],
});
const handleFetchProductByIdRejected = (
  state: ProductState,
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

// // Find products
// const handleFilteredProductsFulfilled = (
//   state: ProductState,
//   action: PayloadAction<IProduct[]>
// ) => ({
//   ...state,
//   isLoading: false,
//   products: action.payload,
//   snackbar:{
//     open: action.payload.length === 0 ? true : state.snackbar.open,
//     message: action.payload.length === 0 ? 'No products found' : state.snackbar.message,
//     severity: action.payload.length === 0 ? ('warning' as const) : state.snackbar.severity,
//   }
// });
// const handleFilteredProductsRejected = (
//   state: ProductState,
//   action: PayloadAction<string | undefined>
// ) => ({
//   ...state,
//   isLoading: false,
//   error: action.payload,
//   snackbar:{
//     open: true ,
//     message: action.payload ?? 'Unknown error',
//     severity: action.payload === 'No products found' ? ('warning' as const) : ('error' as const),
//   }
// });

// Delete product
const handleDeleteProductFulfilled = (state: ProductState, action: PayloadAction<string>) => ({
  ...state,
  isLoading: false,
  products: state.products.filter((product) => product.id !== String(action.payload)),
  snackbar: {
    open: true,
    message: `Product deleted successfully!`,
    severity: 'success' as const,
  },
});
const handleDeleteProductRejected = (
  state: ProductState,
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

// Add product
const handleAddProductFulfilled = (state: ProductState, action: PayloadAction<IProduct>) => ({
  ...state,
  isLoading: false,
  products: [...state.products, action.payload],
  snackbar: {
    open: true,
    message: `Product added successfully!`,
    severity: 'success' as const,
  },
});
const handleAddProductRejected = (
  state: ProductState,
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

// Update product
const handleUpdateProductFulfilled = (state: ProductState, action: PayloadAction<IProduct>) => ({
  ...state,
  isLoading: false,
  products: state.products.map((product) =>
    product.id === action.payload.id ? action.payload : product
  ),
  snackbar: {
    open: true,
    message: `Product updated successfully!`,
    severity: 'success' as const,
  },
});
const handleUpdateProductRejected = (
  state: ProductState,
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

const productSlice = createSlice({
  name: 'product',
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
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    builder
      // All products
      .addCase(fetchAllProducts.fulfilled, handleFetchAllProductsFulfilled)
      .addCase(fetchAllProducts.rejected, handleFetchAllProductsRejected)
      // Product by ID
      .addCase(fetchProductById.fulfilled, handleFetchProductByIdFulfilled)
      .addCase(fetchProductById.rejected, handleFetchProductByIdRejected)
      // // Find products
      // .addCase(fetchFilteredProducts.fulfilled, handleFilteredProductsFulfilled)
      // .addCase(fetchFilteredProducts.rejected, handleFilteredProductsRejected)
      // Delete product
      .addCase(deleteProduct.fulfilled, handleDeleteProductFulfilled)
      .addCase(deleteProduct.rejected, handleDeleteProductRejected)
      // Add product
      .addCase(addProduct.fulfilled, handleAddProductFulfilled)
      .addCase(addProduct.rejected, handleAddProductRejected)
      // Update product
      .addCase(updateProduct.fulfilled, handleUpdateProductFulfilled)
      .addCase(updateProduct.rejected, handleUpdateProductRejected)
      // pending
      .addMatcher((action: Action) => action.type.endsWith('/pending'), handleProductPending);
  },
});

export const PRODUCT_DURATION = 3000;
export const { showSnackbar, hideSnackbar } = productSlice.actions;
export default productSlice.reducer;
