import { Box } from '@mui/material';
import React from 'react';

import svgColorClasses from './classes';
import type SvgColorProps from './types';

// ----------------------------------------------------------------------

function SvgColorComponent(
  props: SvgColorProps,
  ref: React.Ref<HTMLSpanElement>
): React.ReactElement {
  const { src, width = 24, height, className = '', sx = {}, ...other } = props;
  return (
    <Box
      ref={ref}
      component="span"
      className={svgColorClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        flexShrink: 0,
        height: height ?? width,
        display: 'inline-flex',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

SvgColorComponent.displayName = 'SvgColor';

export default React.forwardRef(SvgColorComponent);
