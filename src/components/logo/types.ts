import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export default LogoProps;
