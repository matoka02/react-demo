/* eslint-disable react/jsx-props-no-spreading */
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import layoutClasses from '../classes';

// ----------------------------------------------------------------------

export function Main({ children, sx, ...other }: BoxProps): React.ReactElement {
  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

export function CompactContent({
  sx,
  layoutQuery,
  children,
  ...other
}: BoxProps & { layoutQuery: Breakpoint }): React.ReactElement {
  const theme = useTheme();

  return (
    <Box
      className={layoutClasses.content}
      sx={{
        width: 1,
        mx: 'auto',
        display: 'flex',
        flex: '1 1 auto',
        textAlign: 'center',
        flexDirection: 'column',
        p: theme.spacing(3, 2, 10, 2),
        maxWidth: 'var(--layout-simple-content-compact-width)',
        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: 'center',
          p: theme.spacing(10, 0, 10, 0),
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
