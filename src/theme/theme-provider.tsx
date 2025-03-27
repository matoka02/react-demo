import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

import { createTheme2 } from './create-theme';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: Props) {
  const theme = createTheme2();

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

export default ThemeProvider;
