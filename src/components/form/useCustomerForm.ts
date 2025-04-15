/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver } from 'react-hook-form';
import * as Yup from 'yup';

import { ICustomer, INewCustomer } from '@/stores/types/newModelTypes';
import { omitKey } from '@/utils/objectUtils';

const customerSchema = Yup.object().shape({
  // name: Yup.string().required(),
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('Mandatory Field'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Mandatory Field'),
  email: Yup.string().email('Email is not Valid').required('Mandatory Field'),
  mobile: Yup.string().min(10, 'Min 10 numbers required').required('Mandatory Field'),
  phone: Yup.string().min(10, 'Min 10 numbers required').required('Mandatory Field'),
  city: Yup.string().required('Mandatory Field'),
  state: Yup.string().required('Mandatory Field'),
  country: Yup.string().required('Mandatory Field'),
  membership: Yup.string().required('Mandatory Field'),
  hasItemInShoppingCart: Yup.boolean().required('Mandatory Field'),
});

export const initialFieldValues: INewCustomer = {
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  phone: '',
  city: '',
  state: '',
  country: '',
  membership: 'standard',
  hasItemInShoppingCart: false,
};

export const toFormCustomer = (customer: ICustomer): INewCustomer => omitKey(customer, 'id');

export const useCustomerForm = (existingCustomer?: ICustomer) =>
  useForm<INewCustomer>({
    resolver: yupResolver(customerSchema) as Resolver<INewCustomer>,
    defaultValues: existingCustomer ? omitKey(existingCustomer, 'id') : initialFieldValues,
  });
