import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import labelClasses from './classes';
import { labelStyle } from './styles';
import { LabelProps } from './types';

// ----------------------------------------------------------------------

function sentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function LabelComponent(props: LabelProps, ref: React.Ref<HTMLSpanElement>): React.ReactElement {
  const {
    children,
    color = 'default',
    variant = 'soft',
    startIcon,
    endIcon,
    sx,
    className,
    // ...other
  } = props;

  const theme = useTheme();

  const iconStyles = {
    width: 16,
    height: 16,
    '& svg, img': {
      width: 1,
      height: 1,
      objectFit: 'cover',
    },
  };
  const lblStyle = labelStyle(theme, { color, variant });

  return (
    <InputLabel
      ref={ref}
      component="span"
      className={labelClasses.root.concat(className ? `${className}` : '')}
      sx={{ ...(startIcon && { pl: 0.75 }), ...(endIcon && { pr: 0.75 }), ...sx, ...lblStyle }}
    >
      {startIcon && (
        <Box component="span" className={labelClasses.icon} sx={{ mr: 0.75, ...iconStyles }}>
          {startIcon}
        </Box>
      )}

      {typeof children === 'string' ? sentenceCase(children) : children}

      {endIcon && (
        <Box component="span" className={labelClasses.icon} sx={{ mr: 0.75, ...iconStyles }}>
          {endIcon}
        </Box>
      )}
    </InputLabel>
  );
}

LabelComponent.displayName = 'Label';

export default React.forwardRef(LabelComponent);
