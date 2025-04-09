/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { fToNow } from '@/utils/format-time';

import type { PostItemProps } from '../blog/PostItem';
import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: PostItemProps[];
};

// ----------------------------------------------------------------------

function PostItem({ sx, item, ...other }: BoxProps & { item: Props['list'][number] }) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={item.title}
        secondary={item.description}
        slotProps={{
          primary: { noWrap: true, typography: 'subtitle2' },
          secondary: { mt: 0.5, noWrap: true, component: 'span' },
        }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(item.postedAt)}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function AnalyticsNews({ title, subheader, list, ...other }: Props): React.ReactElement {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />
      <Box sx={{ minWidth: 640 }}>
        {list.map((post) => (
          <PostItem key={post.id} item={post} />
        ))}
      </Box>
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

AnalyticsNews.defaultProps = {
  title: '',
  subheader: '',
};

export default AnalyticsNews;
