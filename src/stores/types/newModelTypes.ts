/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * The ID is generated on the backend. In the project, the backend imitation is performed on API routers.
 */

/* ====== AGENTS ====== */

export interface IAgent extends Agent {}
export interface INewAgent extends Omit<Agent, 'id' | 'name'> {
  id?: never;
  name?: string;
}

/* ====== CUSTOMERS ====== */

export interface ICustomer extends Customer {}
export interface INewCustomer extends Omit<Customer, 'id' | 'name'> {
  id?: never;
  name?: string;
}

/* ====== PRODUCTS ====== */

export interface IProduct extends Product {}
export interface INewProduct extends Omit<Product, 'id'> {
  id?: never;
}

/* ====== ORDERS ====== */

export interface IOrder extends Order {}
export interface INewOrder extends Omit<Order, 'id' | 'orderId'> {
  id?: never;
  orderId?: never;
}

/**
 * In the project use JSONPlaceholder.
 */

/* ====== USER TASKS ====== */

export interface IUserTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface INewUserTask extends Omit<IUserTask, 'id'> {
  id?: never;
}
