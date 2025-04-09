import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import SnapNotice from '@/components/controls/SnapNotice';
import { Iconify } from '@/components/iconify';
import OrderTableHead from '@/components/order/OrderTableHead';
import OrderTableRow from '@/components/order/OrderTableRows';
import OrderTableToolbar from '@/components/order/OrderTableToolbar';
import { Scrollbar } from '@/components/scrollbar';
import TableEmptyRows from '@/components/table/TableEmptyRows';
import TableNoData from '@/components/table/TableNoData';
import { applyFilter, emptyRows, getComparator, useTable } from '@/components/table/useTable';
import { RouterLink } from '@/routes/components';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { hideSnackbar, ORDER_DURATION } from '@/stores/orders/orderSlice';
import { fetchAllOrders } from '@/stores/orders/orderThunk';
import { RootState } from '@/stores/store';

// ----------------------------------------------------------------------

function OrderView(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { orders, snackbar } = useAppSelector((state: RootState) => state.orders);
  // console.table(orders);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const table = useTable({
    postDeleteRoute: '/orders',
    entityType: 'order',
    duration: ORDER_DURATION,
  });

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  const dataFiltered: TODO = applyFilter({
    inputData: orders,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const headOrderLabel = [
    { id: 'id', label: 'Order Number' },
    { id: 'item', label: 'Item' },
    { id: 'amount', label: 'Total Amount', align: 'right' },
    // { id: 'discount', label: 'Discount', align: 'right' },
    { id: 'promoCode', label: 'Promote Code', align: 'center' },
    { id: 'customer', label: 'Customer', align: 'left' },
    { id: 'isDelayed', label: 'Is Delayed', align: 'center' },

    { id: 'status', label: 'Status' },
    { id: '' },
  ];

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Orders
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink}
          href="/orders/form/new"
        >
          New order
        </Button>
      </Box>

      <Card>
        <OrderTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onMultipleDelete={table.onMultipleDelete}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={orders.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    orders.map((order) => order.id)
                  )
                }
                headLabel={headOrderLabel}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: TODO) => (
                    <OrderTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDialogConfirm={table.onDialogConfirm}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, orders.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={orders.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <SnapNotice
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={ORDER_DURATION}
        onClose={handleClose}
      />
    </>
  );
}

export default OrderView;
