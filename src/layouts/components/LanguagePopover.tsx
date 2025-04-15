import Box from '@mui/material/Box';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import React, { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

type LanguagePopoverProps = IconButtonProps & {
  data?: {
    value: string;
    label: string;
    icon: string;
  }[];
};

const DEFAULT_LANGUAGES = [
  {
    value: 'en',
    label: 'English',
    icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/fr.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/de.svg',
  },
  {
    value: 'es',
    label: 'Spanish',
    icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/es.svg',
  },
];

function LanguagePopover({
  data = DEFAULT_LANGUAGES,
  sx,
  ...other
}: LanguagePopoverProps): React.ReactElement {
  const [locale, setLocale] = useState<string>(data[0].value);

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeLang = useCallback(
    (newLang: string) => {
      setLocale(newLang);
      handleClosePopover();
    },
    [handleClosePopover]
  );

  const currentLang = data.find((lang) => lang.value === locale);

  const renderFlag = (label?: string, icon?: string) => (
    <Box
      component="img"
      alt={label}
      src={icon}
      sx={{ width: 26, height: 20, borderRadius: 0.5, objectFit: 'cover' }}
    />
  );

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && { bgcolor: 'action.selected' }),
          ...sx,
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      >
        {renderFlag(currentLang?.label, currentLang?.icon)}
      </IconButton>

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
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data?.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang?.value}
              onClick={() => handleChangeLang(option.value)}
            >
              {renderFlag(option.label, option.icon)}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}

LanguagePopover.defaultProps = {
  data: DEFAULT_LANGUAGES,
};

export default LanguagePopover;
