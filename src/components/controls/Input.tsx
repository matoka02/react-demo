import { TextField } from '@mui/material';

function Input(props: any): React.ReactElement {
  const { name, label, variant, value, error = null, onChange, ...others } = props;
  // console.log(JSON.stringify(others))
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(error && { error: true, helperText: error })}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...others}
    />
  );
}

export default Input;
