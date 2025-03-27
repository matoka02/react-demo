/* eslint-disable camelcase */

// import DB from '@/lib/demo-db';
// import { DBType } from '@/types/DBModel';

import { mock_customers, mock_orders, mock_products } from './_mock';

const mockDB = {
  customers: mock_customers,
  products: mock_products,
  orders: mock_orders,
};

// Getting data taking into account filters
export function getData<T extends keyof typeof mockDB>(
  model: T,
  filters?: Record<string, (prop: string, row: any) => boolean>
): (typeof mockDB)[T] | null {
  const data = mockDB[model] ?? null;

  if (filters && data) {
    return data.filter((row) =>
      Object.keys(filters).every((prop) => filters[prop](prop, row))
    ) as (typeof mockDB)[T];
  }

  return data;
}

// Getting one element
export function getById<T extends keyof typeof mockDB>(
  model: T,
  id: string
): (typeof mockDB)[T] extends (infer U)[] ? U | undefined : never {
  if (!(model in mockDB)) return null as any;

  const data = mockDB[model];
  if (!Array.isArray(data)) return null as any;

  return data.find((item) => item.id === id) as any;
}

// Adding an element
export function postData<T extends keyof typeof mockDB>(
  model: T,
  data: (typeof mockDB)[T] extends (infer U)[] ? Omit<U, 'id'> : never
) {
  if (!(model in mockDB)) return null;

  const collection = mockDB[model];
  if (!Array.isArray(collection)) return null;

  const newItem = { id: `mock-${Date.now()}`, ...data } as any;
  collection.push(newItem);
  return newItem;
}

// Update element
export function putData<T extends keyof typeof mockDB>(
  model: T,
  id: string,
  data: (typeof mockDB)[T] extends (infer U)[] ? Partial<U> : never
) {
  if (!(model in mockDB)) return null;

  const collection = mockDB[model];
  if (!Array.isArray(collection)) return null;

  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) return null;

  collection[index] = { ...collection[index], ...data };
  return collection[index];
}

// Delete element
export function deleteData<T extends keyof typeof mockDB>(model: T, id: string) {
  if (!(model in mockDB)) return null;

  const collection = mockDB[model];
  if (!Array.isArray(collection)) return null;

  mockDB[model] = collection.filter((item) => item.id !== id) as any;
  return id;
}

/* eslint-enable camelcase */
