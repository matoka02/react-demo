/* eslint-disable react/jsx-props-no-spreading */
import { Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import ButtonGenerator from '@/components/controls/Button';
import CheckboxGenerator from '@/components/controls/Checkbox';
import ControllerBox from '@/components/controls/ContollerBox';
import Input from '@/components/controls/Input';
import RadioGroupGenerator from '@/components/controls/RadioGroup';
import SnapNotice from '@/components/controls/SnapNotice';
import {
  initialFieldValues,
  toFormCustomer,
  useCustomerForm,
} from '@/components/form/useCustomerForm';
import { useAppRouter } from '@/routes/hooks';
import { hideSnackbar, CUSTOMER_DURATION } from '@/stores/customers/customerSlice';
import { addCustomer, updateCustomer } from '@/stores/customers/customerThunk';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';
import { ICustomer, INewCustomer } from '@/stores/types/newModelTypes';

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

  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<INewCustomer>({
  //   resolver: yupResolver(customerSchema) as Resolver<INewCustomer>,
  //   defaultValues: existingCustomer ? toFormCustomer(existingCustomer) : initialFieldValues,
  // });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCustomerForm(existingCustomer);

  const theme = useTheme();

  useEffect(() => {
    reset(existingCustomer ? toFormCustomer(existingCustomer) : initialFieldValues);
  }, [existingCustomer, reset]);

  const onSubmit = (data: INewCustomer) => {
    const processedData = {
      ...data,
      name: `${data.firstName} ${data.lastName}`,
    };

    if (isNew) {
      dispatch(addCustomer(processedData));
    } else if (id && typeof id === 'string') {
      dispatch(updateCustomer({ ...(processedData as Omit<ICustomer, 'id'>), id }));
    }

    appRouter.push('/customers');
    // setTimeout(() => {
    //   appRouter.push('/customers');
    // }, CUSTOMER_DURATION);
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
          <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex', alignItems: 'flexStart' }}>
            <Controller
              name="membership"
              control={control}
              render={({ field }) => (
                <ControllerBox>
                  <RadioGroupGenerator
                    {...field}
                    control={control}
                    label="Status"
                    items={membershipArray}
                  />
                </ControllerBox>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex', alignItems: 'flexStart' }}>
            <Controller
              name="hasItemInShoppingCart"
              control={control}
              render={({ field }) => (
                <ControllerBox>
                  <CheckboxGenerator
                    {...field}
                    label="Has item in shopping cart"
                    checked={field.value}
                  />
                </ControllerBox>
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', px: 10, pt: 5 }}>
          <ButtonGenerator text={isNew ? 'Create' : 'Update'} type="submit" />
          <ButtonGenerator text="Reset" color="default" onClick={reset} />
          <ButtonGenerator
            text="Back"
            sx={{ background: theme.palette.common.black }}
            onClick={() => appRouter.back()}
          />
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
