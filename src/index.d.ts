declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}

declare module '*.png';

declare type TODO = any;

declare module '@emotion/styled' {
  // import { CreateStyled } from '@emotion/styled';
  import { Theme } from '@emotion/react';
  import { JSX } from 'react';

  // import { MyTheme } from './myTheme';
  interface MyTheme extends Theme {
    [key: string]: unknown;
  }

  // export * from '@emotion/styled';
  // const customStyled: CreateStyled<MyTheme>;
  // export default customStyled;

  type StyledOptions = {
    shouldForwardProp?: (prop: string) => boolean;
    label?: string;
    target?: string;
  };

  interface CustomStyled {
    <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>, P = object>(
      component: C,
      options?: StyledOptions
    ): React.ComponentType<
      JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C> & P & { theme?: MyTheme }>
    >;
  }

  const styled: CustomStyled;
  export default styled;
  export * from '@emotion/styled';
}

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
