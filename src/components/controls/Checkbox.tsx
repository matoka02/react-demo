import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

interface CheckboxGeneratorProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckboxGenerator({
  name,
  label,
  value,
  onChange,
}: CheckboxGeneratorProps): React.ReactElement {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt);
  };

  return (
    <FormControl>
      <FormControlLabel
        control={<MuiCheckbox name={name} checked={Boolean(value)} onChange={handleChange} />}
        label={label}
      />
    </FormControl>
  );
}

export default CheckboxGenerator;
