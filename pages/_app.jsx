import '../styles/globals.css';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { createTheme } from '@mui/material';
import { AppProvider } from '@toolpad/core';
import { Image } from 'next/image';
import i18n from '../i18n';
import 'dotenv/config';

import { store } from '@/stores/store';

import logoMidPng from './assets/it-logo-mid.png';

const logo = <Image src={logoMidPng} className="logo" alt="" />;
const BRANDING = {
  title: 'React Demo V6',
  logo,
};

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1408, xl: 1530 } },
});

Sentry.init({
  dsn: process.env.SENTRY_DSN_KEY,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracePropagationTargets: [process.env.LOCALHOST, /^https:\/\/yourserver\.io\/api/],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, []);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Provider store={store}>
      <AppProvider theme={theme} branding={BRANDING}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
