import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export type SvgColorProps = BoxProps & {
  src: string;
  width?: number | string;
  height?: number | string;
};
