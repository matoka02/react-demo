import type { Customer, Order, Product } from '@/index.d';

/**
 * The ID is generated on the backend. In the project, the backend imitation is performed on API routers.
 */

/* ====== CUSTOMERS ====== */

export interface ICustomer extends Customer {
  _extendsBaseType?: never;
}
export interface INewCustomer extends Omit<Customer, 'id'> {
  id?: string;
}

/* ====== PRODUCTS ====== */

export interface IProduct extends Product {
  _extendsBaseType?: never;
}
export interface INewProduct extends Omit<Product, 'id'> {
  id?: string;
}

/* ====== ORDERS ====== */

export interface IOrder extends Order {
  _extendsBaseType?: never;
}
export interface INewOrder extends Omit<Order, 'id'> {
  id?: string;
}
