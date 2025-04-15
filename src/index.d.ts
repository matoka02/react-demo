declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}

declare module '*.png';

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
