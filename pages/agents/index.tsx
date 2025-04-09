import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import AgentTableHead from '@/components/agent/AgentTableHead';
import AgentTableRow from '@/components/agent/AgentTableRows';
import AgentTableToolbar from '@/components/agent/AgentTableToolbar';
import SnapNotice from '@/components/controls/SnapNotice';
import { Iconify } from '@/components/iconify';
import { Scrollbar } from '@/components/scrollbar';
import TableEmptyRows from '@/components/table/TableEmptyRows';
import TableNoData from '@/components/table/TableNoData';
import { applyFilter, emptyRows, getComparator, useTable } from '@/components/table/useTable';
import { RouterLink } from '@/routes/components';
import { hideSnackbar, AGENT_DURATION } from '@/stores/agents/agentSlice';
import { fetchAllAgents } from '@/stores/agents/agentThunk';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';

// ----------------------------------------------------------------------

function AgentView(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { agents, snackbar } = useAppSelector((state: RootState) => state.agents);
  // console.table(agents);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dispatch(fetchAllAgents());
  }, [dispatch]);

  const table = useTable({
    postDeleteRoute: '/agents',
    entityType: 'agent',
    duration: AGENT_DURATION,
  });

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  const dataFiltered: TODO = applyFilter({
    inputData: agents,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const headAgentLabel = [
    { id: 'name', label: 'Name' },
    { id: 'company', label: 'Company' },
    { id: 'role', label: 'Role' },
    { id: 'email', label: 'Email' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'isVerified', label: 'Verified', align: 'center' },
    { id: 'status', label: 'Status' },
    { id: '' },
  ];

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Agents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink}
          href="/agents/form/new"
        >
          New agent
        </Button>
      </Box>

      <Card>
        <AgentTableToolbar
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
              <AgentTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={agents.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    agents.map((agent) => agent.id)
                  )
                }
                headLabel={headAgentLabel}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: TODO) => (
                    <AgentTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDialogConfirm={table.onDialogConfirm}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, agents.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={agents.length}
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
        autoHideDuration={AGENT_DURATION}
        onClose={handleClose}
      />
    </>
  );
}

export default AgentView;
