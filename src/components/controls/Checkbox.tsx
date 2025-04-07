import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

interface CheckboxGeneratorProps {
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
  return (
    <FormControl>
      <FormControlLabel
        control={<MuiCheckbox checked={checked} onChange={onChange} />}
        label={label}
      />
    </FormControl>
  );
}

export default CheckboxGenerator;
