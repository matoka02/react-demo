import {
  // Link as MuiLink,
  LinkProps as MuiLinkProps,
} from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

// ----------------------------------------------------------------------

// interface RouterLinkProps extends Omit<MuiLinkProps, 'href'>,
// Omit<NextLinkProps, 'href' | 'as'> {
//   href: string;
//   as?: string;
// }
interface RouterLinkProps extends Omit<MuiLinkProps, 'href'>, Omit<NextLinkProps, 'href'> {
  href: string;
}

function RouterLinkComponent(
  { href, children, ...other }: RouterLinkProps,
  ref: React.Ref<HTMLAnchorElement>
): React.ReactElement {
  return (
    <NextLink href={href} ref={ref} {...other}>
      {}
      {/* <MuiLink ref={ref} {...other}> */}
      {children}
      {/* </MuiLink> */}
    </NextLink>
  );
}

// RouterLinkComponent.defaultProps = {
//   as: undefined,
// };

RouterLinkComponent.displayName = 'RouterLink';

export default React.forwardRef(RouterLinkComponent);
