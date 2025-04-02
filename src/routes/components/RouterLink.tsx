import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

// ----------------------------------------------------------------------

interface RouterLinkProps extends MuiLinkProps, Omit<NextLinkProps, 'href'> {
  href: string;
}

function RouterLinkComponent(
  { href, children, ...other }: RouterLinkProps,
  ref: React.Ref<HTMLAnchorElement>
): React.ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NextLink href={href} passHref legacyBehavior>
      <MuiLink ref={ref} {...other}>
        {children}
      </MuiLink>
    </NextLink>
  );
}

RouterLinkComponent.displayName = 'RouterLink';

export default React.forwardRef(RouterLinkComponent);
