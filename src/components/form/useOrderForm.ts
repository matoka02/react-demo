/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver } from 'react-hook-form';
import * as Yup from 'yup';

import { IOrder, INewOrder } from '@/stores/types/newModelTypes';
import { omitKeys } from '@/utils/objectUtils';

export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

const orderSchema = Yup.object().shape({
  // orderId: Yup.string().min(2).required('Mandatory Field'),
  itemSummary: Yup.string().min(2).required('Mandatory Field'),
  totalPrice: Yup.number()
    .positive('Price cannot be negative')
    .test('is-decimal', 'Amount must have up to 2 decimal places', (value) => {
      if (!value) return true;
      return PRICE_REGEX.test(value.toString());
    })
    .required('Mandatory Field'),
  // discount: Yup.number()
  //   .positive('Discount cannot be negative')
  //   .integer()
  //   .required('Mandatory Field'),
  promoteCode: Yup.string(),
  shippingAddress: Yup.string()
    .min(10, 'Address must be at least 2 characters')
    .required('Mandatory Field'),
  // billingAddress: Yup.string()
  //   .min(10, 'Address must be at least 2 characters'),
  status: Yup.string().required('Mandatory Field'),
  isDelayed: Yup.boolean().required('Mandatory Field'),
  customer: Yup.string().required('Mandatory Field'),
});

export const initialFieldValues: INewOrder = {
  itemSummary: '',
  totalPrice: 0,
  // discount: 0,
  promoteCode: '',
  shippingAddress: '',
  // billingAddress: '',
  status: 'packing',
  isDelayed: false,
  customer: '',
};

export const toFormOrder = (order: IOrder): INewOrder => omitKeys(order, ['id', 'orderId']);

export const useOrderForm = (existingOrder?: IOrder) =>
  useForm<INewOrder>({
    resolver: yupResolver(orderSchema) as Resolver<INewOrder>,
    defaultValues: existingOrder ? omitKeys(existingOrder, ['id', 'orderId']) : initialFieldValues,
  });
