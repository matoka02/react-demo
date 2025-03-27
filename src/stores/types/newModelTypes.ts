import type { Customer } from '@/index.d';

/**
 * The ID is generated on the backend. In the project, the backend imitation is performed on API routers.
 */

/* ====== CUSTOMERS ====== */

export interface ICustomer extends Customer {}

export interface INewCustomer extends Omit<Customer, 'id'> {
  id?: string;
}
