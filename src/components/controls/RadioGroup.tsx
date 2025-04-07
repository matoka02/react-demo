import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';

interface RadioItemType {
  id: string;
  title: string;
}

interface RadioGroupGeneratorProps {
  name: string;
  label: string;
  control:TODO;
  // value: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: RadioItemType[];
}

function RadioItem({ value, label }: { value: string; label: string }): React.ReactElement {
  return <FormControlLabel value={value} control={<Radio />} label={label} />;
}

function RadioGroupGenerator({ name, label, control, items }: RadioGroupGeneratorProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Controller name={name} control={control} render={({field})=>(
        <RadioGroup
        row
        {...field}
        // name={name}
        // label={label}
        // value={value}
        // onChange={onChange}
      >
        {items.map((item: TODO) => (
          <RadioItem key={item.id} value={item.id} label={item.title} />
        ))}
      </RadioGroup>
      )} />
    </FormControl>
  );
}

export default RadioGroupGenerator;
