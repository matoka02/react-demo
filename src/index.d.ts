declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}

declare module '*.png';

declare type TODO = any;

declare module '@emotion/styled' {
  // import styled from '@emotion/styled';
  import { Theme } from '@mui/material';

  export interface MyTheme extends Theme {
    customStyles?: {
      [key: string]: any;
    };
  }
  // export * from '@emotion/styled';
  // const customStyled: typeof styled;
  // export default customStyled;
  // export const customStyled: typeof styled;
  // export default styled;
}

declare type Agent = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status: string;
  company: string;
  email: string;
  mobile: string;
  avatarUrl?: string;
  isVerified: boolean;
  city?: string;
  state?: string;
};

declare type Customer = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  shippingAddress?: string;
  billingAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  mobile: string;
  phone: string;
  credit?: string;
  avatarUrl?: string;
  hasItemInShoppingCart: boolean;
  membership: string;
};

declare type Product = {
  id: string;
  name: string;
  coverUrl?: string;
  colors: string[];
  price: number;
  priceSale: number;
  status: string;
  category: string;
};

declare type Order = {
  id: string;
  orderId: string;
  itemSummary: string;
  customer: string;
  totalPrice: string;
  status: string;
  discount: string;
  promoteCode?: string;
  couponCode?: string;

  avatarUrl?: string;
  isDelayed: boolean;
  shippingAddress: string;
  billingAddress?: string;
};
