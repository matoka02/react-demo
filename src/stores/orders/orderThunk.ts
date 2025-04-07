import { createAsyncThunk } from '@reduxjs/toolkit';

import { HttpMethod } from '../types/httpTypes';

import { IOrder, INewOrder } from '@/stores/types/modelTypes';

export const fetchAllOrders = createAsyncThunk<IOrder[], void, { rejectValue: string }>(
  'order/fetchAllOrders',
  async (_: any, { rejectWithValue }: any) => {
    try {
      const response = await fetch('/api/orders', { method: HttpMethod.GET });

      if (!response.ok) throw new Error('Error loading orders');

      const orders: IOrder[] = await response.json();

      if (!orders) throw new Error('Invalid order data from API');

      return orders;
    } catch (error: any) {
      // console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk<IOrder, string, { rejectValue: string }>(
  'order/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, { method: HttpMethod.GET });

      if (!response.ok) throw new Error('Order not found');

      const data: IOrder = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredOrders = createAsyncThunk<
  IOrder[],
  { customer: string },
  { rejectValue: string }
>('order/fetchFilteredOrders', async (filters: { customer: string }, { rejectWithValue }: any) => {
  try {
    const query = new URLSearchParams(filters).toString();

    const response = await fetch(`/api/orders?${query}`, { method: HttpMethod.GET });

    const data: IOrder[] = await response.json();

    if (data.length === 0) return rejectWithValue('No orders found');

    return data;
  } catch (error: any) {
    // console.error(error.message);
    return rejectWithValue('Error fetching filtered orders');
  }
});

export const deleteOrder = createAsyncThunk<string, string, { rejectValue: string }>(
  'order/deleteOrder',
  async (orderId: string, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: HttpMethod.DELETE,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId }),
      });

      if (!response.ok) throw new Error('Error deleting order. Please, try again');

      const data = await response.json();
      return data.id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk<IOrder, INewOrder, { rejectValue: string }>(
  'order/addOrder',
  async (newOrder: INewOrder, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: HttpMethod.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) throw new Error('Error adding order');

      const data: IOrder = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk<IOrder, IOrder, { rejectValue: string }>(
  'order/updateOrder',
  async (updatedOrder: IOrder, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/orders/${updatedOrder.id}`, {
        method: HttpMethod.PUT,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) throw new Error('Error updating order');

      const data: IOrder = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
