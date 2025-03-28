import Box from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

import iconifyClasses from './classes';
import { FlagIconProps } from './types';

// ----------------------------------------------------------------------

function FlagIconComponent(
  props: FlagIconProps,
  ref: React.Ref<HTMLSpanElement>
): React.ReactElement | null {
  const {
    code,
    className,
    sx,
    // ...other
  } = props;

  const baseStyles: SxProps<Theme> = {
    width: 26,
    height: 20,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: '5px',
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    bgcolor: 'background.neutral',
  };

  if (!code) return null;

  return (
    <Box
      ref={ref}
      component="span"
      className={iconifyClasses.flag.concat(className ? `${className}` : '')}
      sx={{ ...baseStyles, ...sx }}
    >
      <Box component="div" sx={{ width: 1, height: 1, maxWidth: 'unset', objectFit: 'cover' }}>
        <Image
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code?.toUpperCase()}.svg`}
          alt={code}
          loading="lazy"
        />
      </Box>
    </Box>
  );
}

FlagIconComponent.displayName = 'FlagIcon';

export default React.forwardRef(FlagIconComponent);
