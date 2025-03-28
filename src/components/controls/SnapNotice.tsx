import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions/transition';

type SnapNoticeProps = {
  open: boolean;
  transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
  handleClose: () => void;
};

function SnapNotice({ open, transition, handleClose }: SnapNoticeProps): React.ReactElement {
  return (
    <Snackbar
      open={open}
      slots={{ transition }}
      message="Operation is done successfully"
      autoHideDuration={1000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Operation is done successfully!
      </Alert>
    </Snackbar>
  );
}

export default SnapNotice;
