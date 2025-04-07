import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState, useCallback } from 'react';

import { useAppRouter } from '@/routes/hooks';
import { useAppDispatch } from '@/stores/hooks';
import { ORDER_DURATION } from '@/stores/orders/orderSlice';
import { deleteOrder } from '@/stores/orders/orderThunk';

import { Iconify } from '../iconify';
import { Label } from '../label';

// ----------------------------------------------------------------------

const OrderStatus: { [k: string]: string } = {
  packing: 'Packing',
  shipping: 'Shipping',
  'customs-clearance': 'Customs Clearance',
  delivered: 'Delivered',
};

type OrderTableRowProps = {
  row: Order;
  selected: boolean;
  onSelectRow: () => void;
  onDialogConfirm: (message?: string) => Promise<boolean>;
};

function OrderTableRow({
  row,
  selected,
  onSelectRow,
  // toggleNotice,
  onDialogConfirm,
}: OrderTableRowProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [orderId, setOrderId] = useState('');
  const appRouter = useAppRouter();

  const handleOpenPopover = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(evt.currentTarget);
      setOrderId(evt.currentTarget.value);
    },
    [setOpenPopover, setOrderId]
  );

  const handleEditing = useCallback(() => {
    setOpenPopover(null);
    appRouter.push(`/orders/form/${orderId}`);
  }, [orderId, setOpenPopover, appRouter]);

  const handleDelete = useCallback(async () => {
    const deleteConfirmed = await onDialogConfirm();
    if (deleteConfirmed) {
      dispatch(deleteOrder(orderId));

      setTimeout(() => {
        appRouter.push('/orders');
      }, ORDER_DURATION);
    }
    setOpenPopover(null);
  }, [orderId, dispatch, appRouter, onDialogConfirm]);

  return (
    <>
      {/** Table */}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {row.orderId}
          </Box>
        </TableCell>

        <TableCell>{row.itemSummary}</TableCell>

        <TableCell>$ {row.totalPrice}</TableCell>
        {/* <TableCell>$ {row.discount}</TableCell> */}

        <TableCell> {row.promoteCode}</TableCell>
        <TableCell> {row.customer}</TableCell>

        <TableCell align="center">
          {row.isDelayed ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'customs-clearance' && 'error') ||
              (row.status === 'packing' && 'warning') ||
              (row.status === 'shipping' && 'info') ||
              'success'
            }
          >
            {OrderStatus[row.status]}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover} value={row.id}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/** Delete dialog */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={() => setOpenPopover(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleEditing}>
            <Iconify icon="solar:pen-bold" />
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

export default OrderTableRow;
