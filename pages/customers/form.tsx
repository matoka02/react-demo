import { Alert, FormControl, Snackbar, Stack, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import ButtonGenerator from '@/components/controls/Button';
import CheckboxGenerator from '@/components/controls/Checkbox';
import Input from '@/components/controls/Input';
import RadioGroupGenerator from '@/components/controls/RadioGroup';
import SnapNotice from '@/components/controls/SnapNotice';
import useForm from '@/hooks/useForm';
import { useRouter } from '@/routes/hooks';
import { hideSnackbar, CUSTOMER_DURATION } from '@/stores/customers/customerSlice';
import { addCustomer, updateCustomer } from '@/stores/customers/customerThunk';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';
import { ICustomer } from '@/stores/types/newModelTypes';


const customerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('Mandatory Field'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Mandatory Field'),
  email: Yup.string().email('Email is not Valid').required('Mandatory Field'),
  mobile: Yup.string().min(10, 'Min 10 numbers required').required('Mandatory Field'),
  city: Yup.string().required('Mandatory Field'),
  state: Yup.string().required('Mandatory Field'),
  country: Yup.string().required('Mandatory Field'),
  membership: Yup.string().required('Mandatory Field'),
});

const initialFieldValues = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  city: '',
  state: '',
  country: '',
  membership: '',
  hasItemInShoppingCart: false,
};

const membershipArray = [
  { id: 'vip', title: 'VIP' },
  { id: 'standard', title: 'Standard' },
];

function CustomerForm(): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const customer = useAppSelector((state) => state.customers.customer);
  // const customer = customers.find((c) => c.id === id) || initialFieldValues;

  const { values, errors, setErrors, handleInputChange, resetForm, currentField } = useForm(
    initialFieldValues,
    customer
  );

  useEffect(() => {
    if (customer) resetForm(customer);
  }, [customer, resetForm]);

  const validateOnSubmit = async () => {
    try {
      await customerSchema.validate(values, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formattedErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (evt:React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (await validateOnSubmit()) {
      values.name = `${values.firstName} ${values.lastName}`;
      values.location = `${values.city} ${values.state}`;
      dispatch(addCustomer(values));
      router.push('/customers');
    }
  };

  const handleUpdate = async (evt:React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (await validateOnSubmit()) {
      dispatch(updateCustomer(values));
      router.push('/customers');
    }
  };

  return (
    <Paper sx={{ px: 5, py: 5 }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Customer Form
      </Typography>
      <form onSubmit={customer.id ? handleUpdate : handleSubmit}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          {/** Name */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                required
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                variant="outlined"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                required
              />
            </FormControl>
          </Grid>

          {/** Contacts */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                label="E-mail"
                name="email"
                value={values.email}
                type="email"
                onChange={handleInputChange}
                error={errors.email}
                required
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
              />
            </FormControl>
          </Grid>

          {/** Address */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                required
                variant="outlined"
                label="city"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />{' '}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                variant="outlined"
                label="State"
                name="state"
                value={values.state}
                onChange={handleInputChange}
              />{' '}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <Input
                variant="outlined"
                label="Country"
                name="country"
                value={values.country}
                onChange={handleInputChange}
              />{' '}
            </FormControl>
          </Grid>

          {/** Account */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <RadioGroupGenerator
                name="status"
                label="Status"
                value={values.membership}
                onChange={handleInputChange}
                items={membershipArray}
              />
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth>
              <CheckboxGenerator
                name="hasItemInShoppingCart"
                label="Has item in shopping cart"
                value={values.hasItemInShoppingCart}
                onChange={handleInputChange}
              />{' '}
            </FormControl>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', px: 10 }}>
          <ButtonGenerator text={customer.id ? 'Update' : 'Submit'} type="submit" />
          <ButtonGenerator text="Reset" color="default" onClick={resetForm} />
        </Stack>
      </form>
    </Paper>
  );
}

export default CustomerForm;
