import { TableCell } from '@mui/material';
import type { TableRowProps } from '@mui/material/TableRow';
import TableRow from '@mui/material/TableRow';

// ----------------------------------------------------------------------

type TableEmptyRowsProps = TableRowProps & {
  emptyRows: number;
  height?: number;
};

function TableEmptyRows({
  emptyRows,
  height,
  sx,
  ...other
}: TableEmptyRowsProps): React.ReactElement | null {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
        ...sx,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}

TableEmptyRows.defaultProps = {
  height: undefined,
};

export default TableEmptyRows;
