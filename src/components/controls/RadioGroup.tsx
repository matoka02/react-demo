import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface RadioItemType {
  id: string;
  title: string;
}

interface RadioGroupGeneratorProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: RadioItemType[];
}

function RadioItem({ value, label }: { value: string; label: string }): React.ReactElement {
  return <FormControlLabel value={value} control={<Radio />} label={label} />;
}

function RadioGroupGenerator({ name, label, value, onChange, items }: RadioGroupGeneratorProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        // label={label}
        value={value}
        onChange={onChange}
      >
        {items.map((item: TODO) => (
          <RadioItem key={item.id} value={item.id} label={item.title} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioGroupGenerator;
