import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import type { Theme, SxProps } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React from 'react';

import { Iconify } from '../iconify';

import type { PostItemProps } from './PostItem';

// ----------------------------------------------------------------------

type PostSearchProps = {
  posts: PostItemProps[];
  sx?: SxProps<Theme>;
};

function PostSearch({ posts, sx }: PostSearchProps): React.ReactElement {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
            ...sx,
          },
        },
      }}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          placeholder="Search post..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}

PostSearch.defaultProps = {
  sx: undefined,
};

export default PostSearch;
