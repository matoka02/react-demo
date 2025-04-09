/* eslint-disable react/jsx-props-no-spreading */
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import React, { useState, useCallback } from 'react';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
  }[];
};

type ItemProps = BoxProps & {
  checked: boolean;
  item: Props['list'][number];
  onChange: (id: string) => void;
};

// ----------------------------------------------------------------------

function Item({ item, checked, onChange, sx, ...other }: ItemProps): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleMarkComplete = useCallback(() => {
    handleClosePopover();
    // console.info('MARK COMPLETE', item.id);
  }, [handleClosePopover]);

  const handleShare = useCallback(() => {
    handleClosePopover();
    // console.info('SHARE', item.id);
  }, [handleClosePopover]);

  const handleEdit = useCallback(() => {
    handleClosePopover();
    // console.info('EDIT', item.id);
  }, [handleClosePopover]);

  const handleDelete = useCallback(() => {
    handleClosePopover();
    // console.info('DELETE', item.id);
  }, [handleClosePopover]);

  return (
    <>
      <Box
        sx={{
          pl: 2,
          pr: 1,
          py: 1.5,
          display: 'flex',
          ...(checked && { color: 'text.disabled', textDecoration: 'line-through' }),
          ...sx,
        }}
        {...other}
      >
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              checked={checked}
              onChange={onChange}
              slotProps={{
                input: {
                  name: item.name,
                  'aria-label': 'Checkbox demo',
                },
              }}
            />
          }
          label={item.name}
          sx={{ m: 0, flexGrow: 1 }}
        />

        <IconButton
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
          sx={{ alignSelf: 'flex-start' }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>

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
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              pl: 1,
              pr: 2,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleMarkComplete}>
            <Iconify icon="solar:check-circle-bold" />
            Mark complete
          </MenuItem>

          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            Share
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function AnalyticsTasks({ title, subheader, list, ...other }: Props): React.ReactElement {
  const [selected, setSelected] = useState(['2']);

  const handleClickComplete = (taskId: string) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />
      <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{ minWidth: 560 }}>
        {list.map((item) => (
          <Item
            key={item.id}
            item={item}
            checked={selected.includes(item.id)}
            onChange={() => handleClickComplete(item.id)}
          />
        ))}
      </Stack>
    </Card>
  );
}

AnalyticsTasks.defaultProps = {
  title: '',
  subheader: '',
};

export default AnalyticsTasks;
