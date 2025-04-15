/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import GitHubIcon from '@mui/icons-material/GitHub';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React, { useState, useCallback } from 'react';

import { useSession } from '@/config/SessionContext';
import { mock_myAccount } from '@/lib/_mock';
import { useAppRouter, usePathname } from '@/routes/hooks';

// ----------------------------------------------------------------------

type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

function AccountPopover({ data = [], sx, ...other }: AccountPopoverProps): React.ReactElement {
  const router = useAppRouter();
  const { setSession } = useSession();

  const pathname = usePathname();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
    setSession(null);
  }, [setSession]);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path);
    },
    [handleClosePopover, router]
  );

  const handleNewTab = (path: string) => path && window.open(path, '_blank');

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        <Avatar
          src={mock_myAccount.photoURL}
          alt={mock_myAccount.displayName}
          sx={{ width: 1, height: 1 }}
        >
          {mock_myAccount.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <IconButton
        onClick={() => handleNewTab('https://github.com/harryho/react-demo')}
        sx={{
          p: '1px',
          width: 40,
          height: 40,
          background: (theme) => `${theme.vars.palette.primary.light}`,

          ...sx,
        }}
        {...other}
      >
        <GitHubIcon />
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {mock_myAccount?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {mock_myAccount?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            onClick={() => handleClickItem('/sign-in')}
            color="error"
            size="medium"
            variant="text"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}

AccountPopover.defaultProps = {
  data: {
    label: '',
    href: '',
  },
};

export default AccountPopover;
