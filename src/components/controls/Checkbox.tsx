import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

interface CheckboxGeneratorProps {
  // name: string;
  label: string;
  checked: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckboxGenerator({
  // name,
  label,
  checked,
  onChange,
}: CheckboxGeneratorProps): React.ReactElement {
  // const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange(evt);
  // };

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            // name={name}
            checked={checked}
            onChange={onChange}
          />
        }
        label={label}
      />
    </FormControl>
  );
}

export default CheckboxGenerator;
