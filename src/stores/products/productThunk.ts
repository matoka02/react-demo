import { createAsyncThunk } from '@reduxjs/toolkit';

import { IProduct, INewProduct } from '@/stores/types/newModelTypes';

import { HttpMethod } from '../types/httpTypes';

export const fetchAllProducts = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
  'product/fetchAllProducts',
  async (_: any, { rejectWithValue }: any) => {
    try {
      const response = await fetch('/api/products', { method: HttpMethod.GET });

      if (!response.ok) throw new Error('Error loading products');

      const products: IProduct[] = await response.json();

      if (!products) throw new Error('Invalid product data from API');

      return products;
    } catch (error: any) {
      // console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk<IProduct, string, { rejectValue: string }>(
  'product/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${productId}`, { method: HttpMethod.GET });

      if (!response.ok) throw new Error('Customer not found');

      const data: IProduct = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk<
  IProduct[],
  { firstName: string; lastName: string },
  { rejectValue: string }
>(
  'product/fetchFilteredProducts',
  async (filters: { firstName: string; lastName: string }, { rejectWithValue }: any) => {
    try {
      const query = new URLSearchParams(filters).toString();

      const response = await fetch(`/api/products?${query}`, { method: HttpMethod.GET });

      const data: IProduct[] = await response.json();

      if (data.length === 0) return rejectWithValue('No products found');

      return data;
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    } catch (error: any) {
      // console.error(error.message);
      return rejectWithValue('Error fetching filtered products');
    }
  }
);

export const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
  'product/deleteProduct',
  async (productId: string, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/products`, {
        method: HttpMethod.DELETE,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) throw new Error('Error deleting product. Please, try again');

      const data = await response.json();
      return data.id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk<IProduct, INewProduct, { rejectValue: string }>(
  'product/addProduct',
  async (newProduct: INewProduct, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/products`, {
        method: HttpMethod.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Error adding product');

      const data: IProduct = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk<IProduct, IProduct, { rejectValue: string }>(
  'product/updateProduct',
  async (updatedProduct: IProduct, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: HttpMethod.PUT,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error('Error updating product');

      const data: IProduct = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
