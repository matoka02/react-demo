/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import ButtonGenerator from '@/components/controls/Button';
import CheckboxGenerator from '@/components/controls/Checkbox';
import ControllerBox from '@/components/controls/ContollerBox';
import Input from '@/components/controls/Input';
import SnapNotice from '@/components/controls/SnapNotice';
import { useAppRouter } from '@/routes/hooks';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { hideSnackbar, ORDER_DURATION } from '@/stores/orders/orderSlice';
import { addOrder, fetchOrderById, updateOrder } from '@/stores/orders/orderThunk';
import { RootState } from '@/stores/store';
import { IOrder, INewOrder } from '@/stores/types/newModelTypes';

export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

const orderSchema = Yup.object().shape({
  orderId: Yup.string().min(2).required('Mandatory Field'),
  itemSummary: Yup.string().min(2).required('Mandatory Field'),
  totalPrice: Yup.number()
    .positive('Price cannot be negative')
    .test('is-decimal', 'Amount must have up to 2 decimal places', (value) => {
      if (!value) return true;
      return PRICE_REGEX.test(value.toString());
    })
    .required('Mandatory Field'),
  discount: Yup.number()
    .positive('Discount cannot be negative')
    .integer()
    .required('Mandatory Field'),
  shippingAddress: Yup.string()
    .min(10, 'Address must be at least 2 characters')
    .required('Mandatory Field'),
  billingAddress: Yup.string()
    .min(10, 'Address must be at least 2 characters')
    .required('Mandatory Field'),
  status: Yup.string().required('Mandatory Field'),
  isDelayed: Yup.boolean().required('Mandatory Field'),
  customer: Yup.string().required('Mandatory Field'),
});

const initialFieldValues: INewOrder = {
  orderId: '',
  itemSummary: '',
  totalPrice: 0,
  discount: 0,
  shippingAddress: '',
  billingAddress: '',
  status: '',
  isDelayed: false,
  customer: '',
};

const Steps = ['packing', 'shipping', 'customs-clearance', 'delivered'];

const StepLabels = ['Packaging', 'Shipping', 'Customs Clearance', 'Delivered'];

function OrderForm(): React.ReactElement {
  const params = useParams();
  const id = params?.id;
  const isNew = id === 'new';
  const dispatch = useAppDispatch();
  const appRouter = useAppRouter();
  // console.log(id);

  const orders = useAppSelector((state: RootState) => state.orders.orders);
  const { snackbar } = useAppSelector((state: RootState) => state.orders);
  const existingOrder = orders.find((c) => c.id === id);
  // const order = existingOrder ?? initialFieldValues;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: existingOrder || initialFieldValues,
  });

  const step = !existingOrder?.id ? 0 : Steps.indexOf(existingOrder.status) + 1;
  const isNewItem = !existingOrder?.id;

  const theme = useTheme();

  useEffect(() => {
    reset(existingOrder || initialFieldValues);
  }, [existingOrder, reset]);

  const onSubmit = (data: INewOrder | Order) => {
    const processedData = {
      ...data,
      // location: `${data.city} ${data.state}`,
    };

    if (isNew) {
      dispatch(addOrder(processedData as INewOrder));
    } else if (id && typeof id === 'string') {
      dispatch(updateOrder({ ...processedData } as IOrder));
    }

    appRouter.push('/orders');
  };

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Paper sx={{ px: 5, py: 5 }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Order Form
      </Typography>
      <Stack sx={{ py: 10 }}>
        <Stepper activeStep={step} sx={{ mb: { xs: 3, md: 5 } }}>
          {StepLabels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          {/** Item */}
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Controller
              name="itemSummary"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Item Summary"
                  value={field.value}
                  error={errors.itemSummary?.message}
                  disabled={!isNewItem}
                  required
                />
              )}
            />
          </Grid>

          {/** Price */}
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
            <Controller
              name="totalPrice"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Total Price"
                  value={field.value}
                  error={errors.totalPrice?.message}
                  variant="outlined"
                  disabled={!isNewItem}
                  required
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
            <Controller
              name="promoteCode"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Promote Code"
                  value={field.value}
                  error={errors.promoteCode?.message}
                  variant="outlined"
                  disabled={!isNewItem}
                  required
                />
              )}
            />
          </Grid>

          {/** Address */}
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Controller
              name="shippingAddress"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Shipping To"
                  value={field.value}
                  error={errors.shippingAddress?.message}
                  variant="outlined"
                  disabled={!isNewItem}
                  required
                />
              )}
            />
          </Grid>

          {/** Customer */}
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Customer"
                  value={field.value}
                  error={errors.customer?.message}
                  variant="outlined"
                  disabled={!isNewItem}
                  required
                />
              )}
            />
          </Grid>

          {/** Account */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }} sx={{ display: 'flex', alignItems: 'flexStart' }}>
            <Controller
              name="isDelayed"
              control={control}
              render={({ field }) => (
                <ControllerBox>
                  <CheckboxGenerator {...field} label="Is delayed" checked={field.value} />
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
        autoHideDuration={ORDER_DURATION}
        onClose={handleClose}
      />
    </Paper>
  );
}

export default OrderForm;

export function orderLoader({ params }: TODO) {
  const order = fetchOrderById(params.id);
  if (!order) throw new Response('/404', { status: 404 });
  return order;
}
