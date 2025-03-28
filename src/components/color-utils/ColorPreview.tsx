import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import React from 'react';

import { lightPalette as palette } from '@/theme/core';
import { varAlpha } from '@/theme/styles';

import type { ColorPreviewProps } from './types';

// ----------------------------------------------------------------------

function ColorPreviewComponent(
  props: BoxProps & ColorPreviewProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const { colors, limit = 3, sx, ...other } = props;

  const colorsRange = colors.slice(0, limit);
  const restColors = colors.length - limit;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...sx,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {colorsRange.map((color, index) => (
        <Box
          key={`${color + index}`}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            bgcolor: color,
            borderRadius: '50%',
            border: () => `solid 2px ${palette.background.paper}`,
            boxShadow: () => `inset -1px 1px 2px ${varAlpha(palette.common.blackChannel, 0.24)}`,
          }}
        />
      ))}

      {colors.length > limit && (
        <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${restColors}`}</Box>
      )}
    </Box>
  );
}

ColorPreviewComponent.displayName = 'ColorPreview';

export default React.forwardRef(ColorPreviewComponent);
