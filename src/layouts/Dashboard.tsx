import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Head from 'next/head';
import React from 'react';

import { lightPalette as palette } from '@/theme/core';
import { varAlpha } from '@/theme/styles';

import AccountPopover from './components/AccountPopover';

interface DashboardProps {
  children?: React.ReactNode;
}

function Layout({ children }: DashboardProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>Frontend SSR template</title>
        <meta
          name="description"
          content="Frontend SSR template is used for bootstrapping a project."
        />
        <link rel="icon" type="image/svg+xml" href="/it-logo.png" />
      </Head>
      <DashboardLayout
        sx={{ backgroundColor: varAlpha(palette.grey['500Channel'], 0.08) }}
        slots={{ toolbarAccount: AccountPopover } as TODO}
      >
        <PageContainer title="" breadcrumbs={[]}>
          {children}
        </PageContainer>
      </DashboardLayout>
    </>
  );
}

Layout.defaultProps = {
  children: null,
};

export default Layout;
