import Link, { LinkProps } from 'next/link';
import React from 'react';

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
}

function RouterLinkComponent(
  props: RouterLinkProps,
  ref: React.Ref<HTMLAnchorElement>
): React.ReactElement {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const { href, children, ...other } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link ref={ref} href={href} passHref legacyBehavior {...other}>
      <a aria-label={typeof children === 'string' ? children : undefined}>{children}</a>
    </Link>
  );
}

RouterLinkComponent.displayName = 'RouterLink';

export default React.forwardRef(RouterLinkComponent);
