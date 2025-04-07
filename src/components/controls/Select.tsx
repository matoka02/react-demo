import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

function SelectDropdown({
  label,
  value,
  error = null,
  options,
  onChange,
}: any): React.ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormControl fullWidth variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={onChange}
        value={value}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item: any) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default SelectDropdown;
