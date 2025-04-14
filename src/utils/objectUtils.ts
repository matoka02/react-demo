/* eslint-disable @typescript-eslint/no-unused-vars */

export function omitKey<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}

export function omitKeys<T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Omit<T, K[number]> {
  const result = { ...obj };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
}
