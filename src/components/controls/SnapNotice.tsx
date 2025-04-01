import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type SnapNoticeProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
  onClose: () => void;
};

function SnapNotice({
  open,
  message,
  severity,
  autoHideDuration,
  onClose,
}: SnapNoticeProps): React.ReactElement {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

SnapNotice.defaultProps = {
  autoHideDuration: 1000,
};

export default SnapNotice;
