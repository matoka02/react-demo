import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

import { createTheme2 } from './create-theme';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: Props) {
  const theme = createTheme2();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
