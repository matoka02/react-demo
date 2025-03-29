import { FormControl, FormControlLabel, Checkbox } from '@mui/material';

const checkedToValue = (evt: React.SyntheticEvent & TODO) => ({
  target: {
    name: evt.target.name,
    value: evt.target.checked,
  },
});

function CheckboxGenerator({ name, label, value, onChange }: any): React.ReactElement {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox checked={value} onChange={(evt) => onChange(checkedToValue(evt))} name={name} />
        }
        label={label}
      />
    </FormControl>
  );
}

export default CheckboxGenerator;
