import Avatar from '@mui/material/Avatar';
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
import { AGENT_DURATION } from '@/stores/agents/agentSlice';
import { deleteAgent } from '@/stores/agents/agentThunk';
import { useAppDispatch } from '@/stores/hooks';

import { Iconify } from '../iconify';
import { Label } from '../label';

// ----------------------------------------------------------------------

type AgentTableRowProps = {
  row: Agent;
  selected: boolean;
  onSelectRow: () => void;
  // toggleNotice: (open: boolean) => void;
  onDialogConfirm: (message?: string) => Promise<boolean>;
};

function AgentTableRow({
  row,
  selected,
  onSelectRow,
  // toggleNotice,
  onDialogConfirm,
}: AgentTableRowProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [agentId, setAgentId] = useState('');
  const appRouter = useAppRouter();

  const handleOpenPopover = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(evt.currentTarget);
      setAgentId(evt.currentTarget.value);
    },
    [setOpenPopover, setAgentId]
  );

  const handleEditing = useCallback(() => {
    setOpenPopover(null);
    appRouter.push(`/agents/form/${agentId}`);
  }, [agentId, setOpenPopover, appRouter]);

  const handleDelete = useCallback(async () => {
    const deleteConfirmed = await onDialogConfirm();
    if (deleteConfirmed) {
      dispatch(deleteAgent(agentId));

      setTimeout(() => {
        appRouter.push('/agents');
      }, AGENT_DURATION);
    }
    setOpenPopover(null);
  }, [agentId, dispatch, appRouter, onDialogConfirm]);

  return (
    <>
      {/** Table */}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.company}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.mobile}</TableCell>
        {/* <TableCell>{row.billingAddress}</TableCell> */}

        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'locked' && 'error') || 'info'}>{row.status}</Label>
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

export default AgentTableRow;
