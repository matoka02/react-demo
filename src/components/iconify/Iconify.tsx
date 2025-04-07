import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import React from 'react';

import iconifyClasses from './classes';
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

function IconifyComponent(
  { className, width = 20, sx, ...other }: IconifyProps,
  ref: React.Ref<SVGElement>
): React.ReactElement {
  return (
    <Box
      ssr
      ref={ref}
      component={Icon}
      className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
      sx={{ width, height: width, flexShrink: 0, display: 'inline-flex', ...sx }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

IconifyComponent.displayName = 'Iconify';

export default React.forwardRef(IconifyComponent);
