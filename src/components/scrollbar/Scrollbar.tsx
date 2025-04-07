import Box from '@mui/material/Box';
import React from 'react';
// import SimpleBar from 'simplebar-react';

import scrollbarClasses from './classes';
import type ScrollbarProps from './types';

// ----------------------------------------------------------------------

function ScrollbarComponent(
  {
    // slotProps,
    children,
    // fillContent,
    sx,
    ...other
  }: ScrollbarProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  return (
    <Box
      ref={ref}
      // clickOnTrack={false}
      className={scrollbarClasses.root}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-placeholder': { display: 'none' },
        // eslint-disable-next-line react/jsx-props-no-spreading
        ...sx,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {children}
    </Box>
  );
}

const Scrollbar = React.forwardRef(ScrollbarComponent);
Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
