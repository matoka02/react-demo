import { useDialogs } from '@toolpad/core';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { deleteAgent } from '@/stores/agents/agentThunk';
import { deleteCustomer } from '@/stores/customers/customerThunk';
import { useAppDispatch } from '@/stores/hooks';

// ----------------------------------------------------------------------

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ----------------------------------------------------------------------

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (
  a: {
    [key in Key]: number | string;
  },
  b: {
    [key in Key]: number | string;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: Agent[] | Customer[] | Order[]; // Array<UserProps| CustomerProps |OrderProps >;
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let filteredData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    filteredData = filteredData.filter((user: TODO) =>
      user.name.toLowerCase().includes(filterName.toLowerCase())
    ) as TODO;
  }

  return filteredData;
}

//-------------------------------------------------------------

export type useTableProps = {
  postDeleteRoute: string | undefined;
  entityType: 'customer' | 'agent' | string;
  duration: number;
};

export function useTable(props?: useTableProps) {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const dialogs = useDialogs();
  const router = useRouter();
  const { postDeleteRoute, entityType, duration } = props || {};
  const dispatch = useAppDispatch();

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  const onDialogConfirm = useCallback(
    async (message = '') => {
      try {
        return await dialogs.confirm(message || 'Are you sure to continue this DELETE operation?');
      } catch {
        // console.error(e);
        return false;
      }
    },
    [dialogs]
  );

  const onMultipleDelete = useCallback(
    async (event: React.MouseEvent<HTMLInputElement>) => {
      const deleteConfirmed = await onDialogConfirm();
      if (deleteConfirmed) {
        if (selected.length > 0) {
          // selected.forEach((id) => dispatch(deleteCustomer(id)));
          selected.forEach((id) => {
            if (entityType === 'customer') {
              dispatch(deleteCustomer(id));
            } else if (entityType === 'agent') {
              dispatch(deleteAgent(id));
            }
          });
        }
        setSelected([]);
        setTimeout(() => {
          router.push(postDeleteRoute || '/');
        }, duration);
      }
    },
    [dispatch, onDialogConfirm, selected, router, postDeleteRoute, entityType, duration]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
    onMultipleDelete,
    onDialogConfirm,
  };
}
