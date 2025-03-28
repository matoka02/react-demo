// import { useTheme } from '@mui/material';
import { useState } from 'react';

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
  const [currentField, setCurrentField] = useState('');

  // const theme = useTheme();
  // const classes = getStyles(theme);

  const handleInputChange = (evt: TODO) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
    // console.log("inputChange");
    setCurrentField(name);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

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
