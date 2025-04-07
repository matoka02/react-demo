/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';

function Input({ label, variant, error = null, ...others }: any): React.ReactElement {
  return (
    <TextField
      variant={variant}
      label={label}
      {...(error && { error: true, helperText: error })}
      {...others}
    />
  );
}

export default Input;
