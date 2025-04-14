/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * The ID is generated on the backend. In the project, the backend imitation is performed on API routers.
 */

/* ====== AGENTS ====== */

export interface IAgent extends Agent {
  _extendsBaseType?: never;
}
export interface INewAgent extends Omit<Agent, 'id'> {
  id?: never;
}

/* ====== CUSTOMERS ====== */

export interface ICustomer extends Customer {}
export interface INewCustomer extends Omit<Customer, 'id'> {
  id?: never;
}

/* ====== PRODUCTS ====== */

export interface IProduct extends Product {
  _extendsBaseType?: never;
}
export interface INewProduct extends Omit<Product, 'id'> {
  id?: never;
}

/* ====== ORDERS ====== */

export interface IOrder extends Order {
  _extendsBaseType?: never;
}
export interface INewOrder extends Omit<Order, 'id' | 'orderId'> {
  id?: never;
  orderId?: never;
}
