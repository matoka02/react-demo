import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import React from 'react';

import { lightPalette as palette } from '@/theme/core';
import { varAlpha } from '@/theme/styles';

import AccountPopover from './components/AccountPopover';

interface DashboardProps {
  children?: React.ReactNode;
}

function Layout({ children }: DashboardProps): React.ReactElement {
  return (
    <DashboardLayout
      sx={{ backgroundClip: varAlpha(palette.grey['500Channel'], 0.08) }}
      slots={{ toolbarAccount: AccountPopover } as TODO}
    >
      <PageContainer title="" breadcrumbs={[]}>
        {children}
      </PageContainer>
    </DashboardLayout>
  );
}

Layout.defaultProps = {
  children: null,
};

export default Layout;
