import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React, { useState, useCallback } from 'react';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type ProductSortProps = ButtonProps & {
  sortBy: string;
  onSort: (newSort: string) => void;
  options: { value: string; label: string }[];
};

function ProductSort({
  options,
  sortBy,
  onSort,
  sx,
  ...other
}: ProductSortProps): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(evt.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpenPopover}
        endIcon={<Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
        sx={sx}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {options.find((option) => option.value === sortBy)?.label}
        </Typography>
      </Button>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === sortBy}
              onClick={() => {
                onSort(option.value);
                handleClosePopover();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}

export default ProductSort;
