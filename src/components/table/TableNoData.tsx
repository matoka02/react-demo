import { Box, TableCell, TableRow, TableRowProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type TableNoDataProps = TableRowProps & {
  searchQuery: string;
};

function TableNoData({ searchQuery, ...other }: TableNoDataProps): React.ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Not found
          </Typography>
          <Typography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{searchQuery}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default TableNoData;
