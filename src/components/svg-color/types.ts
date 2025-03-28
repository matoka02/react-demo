import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

type SvgColorProps = BoxProps & {
  src: string;
  width?: number | string;
  height?: number | string;
};

export default SvgColorProps;
