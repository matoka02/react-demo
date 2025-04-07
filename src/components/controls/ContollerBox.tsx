import { Box, useTheme } from '@mui/material';
import React from 'react';

function ContollerBox({ children }: any): React.ReactElement {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        border: '2px solid',
        borderColor: theme.palette.grey[300],
        borderRadius: 1,
        p: 2,
        backgroundColor: theme.palette.common.white,
        '&:focus-within': {
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default ContollerBox;
