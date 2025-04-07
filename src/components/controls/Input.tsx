/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';

function Input({ label, variant, value = '', error = null, ...others }: any): React.ReactElement {
  return (
    <TextField
      label={label}
      value={value}
      variant={variant}
      {...(error && { error: true, helperText: error })}
      {...others}
    />
  );
}

export default Input;
