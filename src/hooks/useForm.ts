// import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

// const getStyles = (theme: TODO) => ({
//   root: {
//     '& .MuiFormControl-root': {
//       width: '80%',
//       margin: (theme as TODO).spacing(1),
//     },
//   },
// });

function useForm(initialFieldValues: TODO, selectedData: TODO) {
  const [values, setValues] = useState(selectedData || initialFieldValues);
  const [errors, setErrors] = useState({});
  const [currentField, setCurrentField] = useState<string>('');

  // const theme = useTheme();
  // const classes = getStyles(theme);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = evt.target;
    const { name, value, type, checked } = evt.target;
    setValues({
      ...values,
      // [name]: value,
      [name]: type === 'checkbox' ? checked : value,
    });
    // console.log("inputChange");
    setCurrentField(name);
  };

  const resetForm = (newValues?: TODO) => {
    setValues(newValues ?? initialFieldValues);
    setErrors({});
  };

  useEffect(() => {
    if (selectedData) {
      setValues(selectedData);
    }
  }, [selectedData]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    currentField,
  };
}

export default useForm;
