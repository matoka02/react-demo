/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import ButtonGenerator from '@/components/controls/Button';
import CheckboxGenerator from '@/components/controls/Checkbox';
import Input from '@/components/controls/Input';
import RadioGroupGenerator from '@/components/controls/RadioGroup';
import SnapNotice from '@/components/controls/SnapNotice';
import { useAppRouter } from '@/routes/hooks';
import { hideSnackbar, CUSTOMER_DURATION } from '@/stores/customers/customerSlice';
import { addCustomer, updateCustomer } from '@/stores/customers/customerThunk';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';
import { ICustomer, INewCustomer } from '@/stores/types/newModelTypes';

const customerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('Mandatory Field'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Mandatory Field'),
  email: Yup.string().email('Email is not Valid').required('Mandatory Field'),
  mobile: Yup.string().min(10, 'Min 10 numbers required').required('Mandatory Field'),
  phone: Yup.string().min(10, 'Min 10 numbers required').required('Mandatory Field'),
  city: Yup.string().required('Mandatory Field'),
  state: Yup.string().required('Mandatory Field'),
  country: Yup.string().required('Mandatory Field'),
  membership: Yup.string().required('Mandatory Field'),
});

const initialFieldValues: INewCustomer = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  city: '',
  state: '',
  country: '',
  membership: 'standard',
  hasItemInShoppingCart: false,
};

const membershipArray = [
  { id: 'vip', title: 'VIP' },
  { id: 'standard', title: 'Standard' },
];

function CustomerForm(): React.ReactElement {
  const params = useParams();
  const id = params?.id;
  const isNew = id === 'new';
  const dispatch = useAppDispatch();
  const appRouter = useAppRouter();
  // console.log(id);

  const customers = useAppSelector((state: RootState) => state.customers.customers);
  const { snackbar } = useAppSelector((state: RootState) => state.customers);
  const existingCustomer = customers.find((c) => c.id === id);
  // const customer = existingCustomer ?? initialFieldValues;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: existingCustomer || initialFieldValues,
  });

  useEffect(() => {
    reset(existingCustomer || initialFieldValues);
  }, [existingCustomer, reset]);

  const onSubmit = (data: INewCustomer | Customer) => {
    const processedData = {
      ...data,
      name: `${data.firstName} ${data.lastName}`,
    };

    if (isNew) {
      dispatch(addCustomer(processedData as INewCustomer));
    } else if (id && typeof id === 'string') {
      dispatch(updateCustomer({ ...processedData } as ICustomer));
    }

    appRouter.push('/customers');
  };

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Paper sx={{ px: 5, py: 5 }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Customer Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          {/** Name */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="First Name"
                  value={field.value}
                  error={errors.firstName?.message}
                  required
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Last Name"
                  value={field.value}
                  error={errors.lastName?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>

          {/** Contacts */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="E-mail"
                  value={field.value}
                  error={errors.email?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Mobile"
                  value={field.value}
                  error={errors.mobile?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Phone"
                  value={field.value}
                  error={errors.phone?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>

          {/** Address */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="City"
                  value={field.value}
                  error={errors.city?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="State"
                  value={field.value}
                  error={errors.state?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Country"
                  value={field.value}
                  error={errors.country?.message}
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>

          {/** Account */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="membership"
              control={control}
              render={({ field }) => (
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 1,
                    p: 2,
                    backgroundColor: 'white',
                    '&:focus-within': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <RadioGroupGenerator
                    {...field}
                    control={control}
                    label="Status"
                    items={membershipArray}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Controller
              name="hasItemInShoppingCart"
              control={control}
              render={({ field }) => (
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 1,
                    p: 2,
                    backgroundColor: 'white',
                    '&:focus-within': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <CheckboxGenerator
                    {...field}
                    label="Has item in shopping cart"
                    checked={field.value}
                  />
                </Box>
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', px: 10 }}>
          <ButtonGenerator text={isNew ? 'Create' : 'Update'} type="submit" />
          <ButtonGenerator text="Reset" color="default" onClick={reset} />
        </Stack>
      </form>

      <SnapNotice
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={CUSTOMER_DURATION}
        onClose={handleClose}
      />
    </Paper>
  );
}

export default CustomerForm;
