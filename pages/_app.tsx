// import '../styles/globals.css';
import { createTheme } from '@mui/material';
import * as Sentry from '@sentry/react';
import { Session } from '@toolpad/core';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppProps } from 'next/app';
import React, { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';

import { BRANDING } from '@/config/Branding';
import NAVIGATION from '@/config/Navigation';
import { SessionContext } from '@/config/SessionContext';
import Layout from '@/layouts/Dashboard';
import { store } from '@/stores/store';
// import { createTheme2 } from '@/theme/create-theme';
// import ThemeProvider from '@/theme/theme-provider';

// eslint-disable-next-line import/extensions
import i18n from '../i18n';
import 'dotenv/config';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1408, xl: 1530 } },
});
// const combinedTheme = createTheme2();

Sentry.init({
  dsn: process.env.SENTRY_DSN_KEY,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracePropagationTargets: [process.env.LOCALHOST as string, /^https:\/\/yourserver\.io\/api/],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);
  const sessionContextValue = useMemo(() => ({ session, setSession }), [session, setSession]);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, []);

  return (
    <Provider store={store}>
      <SessionContext.Provider value={sessionContextValue}>
        <NextAppProvider
          theme={theme}
          // theme={combinedTheme}
          navigation={NAVIGATION}
          branding={BRANDING}
          session={session}
        >
          <Layout>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Layout>
        </NextAppProvider>
      </SessionContext.Provider>
    </Provider>
  );
}

export default MyApp;
