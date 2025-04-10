/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import React from 'react';

import { CompactContent, Main } from './main';

// ----------------------------------------------------------------------

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  content?: {
    compact?: boolean;
  };
};

export function SimpleLayout({
  sx,
  children,
  header,
  content,
}: SimpleLayoutProps): React.ReactElement {
  const layoutQuery: Breakpoint = 'lg';

  return (
    <Main>
      {content?.compact ? (
        <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
      ) : (
        children
      )}
    </Main>
  );
}

SimpleLayout.defaultProps = {
  sx: {},
  header: {},
  content: {},
};
