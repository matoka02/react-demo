import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import SnapNotice from '@/components/controls/SnapNotice';
import CustomerTableHead from '@/components/customer/CustomerTableHead';
import CustomerTableRow from '@/components/customer/CustomerTableRows';
import CustomerTableToolbar from '@/components/customer/CustomerTableToolbar';
import { Iconify } from '@/components/iconify';
import { Scrollbar } from '@/components/scrollbar';
import TableEmptyRows from '@/components/table/TableEmptyRows';
import TableNoData from '@/components/table/TableNoData';
import { applyFilter, emptyRows, getComparator, useTable } from '@/components/table/utils';
import { RouterLink } from '@/routes/components';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';
import { fetchAllCustomers } from '@/stores/customers/customerThunk';
import { setSearch } from '@/stores/customers/customerSlice';

// ----------------------------------------------------------------------

function CustomerView(): React.ReactElement {
  // const [notice, setNotice] = useState<{
  //   open: boolean;
  //   transition: React.ComponentType<
  //     TransitionProps & {
  //       children: React.ReactElement<any, any>;
  //     }
  //   >;
  // }>({ open: false, transition: Fade });

  // const toggleNotice = (open: boolean) => {
  //   setNotice({ ...notice, open });
  // };

  // const table = useTable({
  //   postDeleteRoute: '/customers',
  //   service,
  //   toggleNotice,
  // });

  // const mock_customers = service.getAllItems();

  // const [filterName, setFilterName] = useState('');

  // const dataFiltered: TODO = applyFilter({
  //   inputData: mock_customers as TODO,
  //   comparator: getComparator(table.order, table.orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  // const handleClose = () => {
  //   setNotice({ ...notice, open: false });
  // };

  const dispatch = useAppDispatch();
  const { customers, isLoading } = useAppSelector((state: RootState) => state.customers);
  // console.table(customers);
  const [filterName, setFilterName] = useState('');
  const table = useTable();

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  // useEffect(() => {
  //   if (filterName) {
  //     dispatch(setSearch({ firstName: filterName, lastName: '' }));
  //   } else {
  //     dispatch(fetchAllCustomers());
  //   }
  // }, [dispatch, filterName]);

  const dataFiltered: TODO = applyFilter({
    inputData: customers,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const toggleNotice = () => {};

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Customers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink}
          href="/customer-form"
        >
          New customer
        </Button>
      </Box>

      <Card>
        <CustomerTableToolbar
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
              <CustomerTableHead
                order={table.order}
                orderBy={table.orderBy}
                // rowCount={mock_customers.length}
                rowCount={customers.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    // mock_customers.map((customer: TODO) => customer.id)
                    customers.map((customer) => customer.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'phone', label: 'Phone' },
                  // { id: 'billingAddress', label: 'Billing Address' },
                  { id: 'hasItemInShoppingCart', label: 'Cart Has Item', align: 'center' },
                  { id: 'membership', label: 'Membership' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  // {customers
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: TODO) => (
                    <CustomerTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      toggleNotice={toggleNotice}
                      onDialogConfirm={table.onDialogConfirm}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, customers.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={customers.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      {/* <SnapNotice open={notice.open} transition={notice.transition} handleClose={handleClose} /> */}
    </>
  );
}

export default CustomerView;
