import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import { SimpleLayout } from '@/layouts/simple';
import { RouterLink } from '@/routes/components';

// ----------------------------------------------------------------------

function NotFoundView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration-404.svg"
          sx={{
            width: 320,
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button component={RouterLink} href="/" size="large" variant="contained" color="secondary">
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
}

export default NotFoundView;
