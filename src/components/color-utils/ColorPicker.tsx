import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { alpha as hexAlpha } from '@mui/material/styles';
import React, { useCallback } from 'react';

import { lightPalette as palette } from '@/theme/core';
import { varAlpha } from '@/theme/styles';

import { Iconify } from '../iconify';

import type { ColorPickerProps } from './types';

// ----------------------------------------------------------------------

function ColorPickerComponent(
  {
    colors,
    selected,
    onSelectColor,
    limit = 'auto',
    sx,
    slotProps,
    ...other
  }: BoxProps & ColorPickerProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const singleSelect = typeof selected === 'string';

  const handleSelect = useCallback(
    (color: string) => {
      if (singleSelect) {
        if (color !== selected) onSelectColor(color);
      }
      if (!singleSelect) {
        const newSelected = selected.includes(color)
          ? selected.filter((value) => value !== color)
          : [...selected, color];
        onSelectColor(newSelected);
      }
    },
    [onSelectColor, selected, singleSelect]
  );

  return (
    <Box
      ref={ref}
      sx={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        display: 'inline-flex',
        ...(limit !== 'auto' && {
          width: limit * 36,
          justifyContent: 'flex-end',
        }),
        ...sx,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {colors.map((color) => {
        const hasSelected = singleSelect ? selected === color : selected.includes(color);

        return (
          <Box component="li" key={color} sx={{ display: 'inline-flex' }}>
            <ButtonBase
              aria-label={color}
              onClick={() => handleSelect(color)}
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                ...slotProps?.button,
              }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={(theme) => ({
                  width: 20,
                  height: 20,
                  bgcolor: color,
                  borderRadius: '50%',
                  // border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                  border: `solid 1px ${varAlpha(palette.grey['500Channel'], 0.16)}`,
                  ...(hasSelected && {
                    transform: 'scale(1.3)',
                    boxShadow: `4px 4px 8px 0 ${hexAlpha(color, 0.48)}`,
                    outline: `solid 2px ${hexAlpha(color, 0.08)}`,
                    transition: theme.transitions.create('all', {
                      duration: theme.transitions.duration.shortest,
                    }),
                  }),
                })}
              >
                <Iconify
                  width={hasSelected ? 12 : 0}
                  icon="eva:checkmark-fill"
                  sx={(theme) => ({
                    color: theme.palette.getContrastText(color),
                    transition: theme.transitions.create('all', {
                      duration: theme.transitions.duration.shortest,
                    }),
                  })}
                />
              </Stack>
            </ButtonBase>
          </Box>
        );
      })}
    </Box>
  );
}

ColorPickerComponent.displayName = 'ColorPicker';

export default React.forwardRef(ColorPickerComponent);
