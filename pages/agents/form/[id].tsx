/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, useTheme } from '@mui/material';
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
import RadioGroupGenerator from '@/components/controls/RadioGroup';
import SelectDropdown from '@/components/controls/Select';
import SnapNotice from '@/components/controls/SnapNotice';
import { roleArray } from '@/lib/_mock';
import { useAppRouter } from '@/routes/hooks';
import { hideSnackbar, AGENT_DURATION } from '@/stores/agents/agentSlice';
import { addAgent, updateAgent } from '@/stores/agents/agentThunk';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';
import { IAgent, INewAgent } from '@/stores/types/newModelTypes';

const agentSchema = Yup.object().shape({
  company: Yup.string().min(4, 'Company must be at least 4 characters').required('Mandatory Field'),
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
  role: Yup.string().required('Mandatory Field'),
  status: Yup.string().required('Mandatory Field'),
  isVerified: Yup.boolean().required('Mandatory Field'),
});

const initialFieldValues: INewAgent = {
  company: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  city: '',
  state: '',
  role: '',
  status: 'locked',
  isVerified: false,
};

const statusArray = [
  { id: 'active', title: 'Active' },
  { id: 'locked', title: 'Locked' },
];

function AgentForm(): React.ReactElement {
  const params = useParams();
  const id = params?.id;
  const isNew = id === 'new';
  const dispatch = useAppDispatch();
  const appRouter = useAppRouter();
  // console.log(id);

  const agents = useAppSelector((state: RootState) => state.agents.agents);
  const { snackbar } = useAppSelector((state: RootState) => state.agents);
  const existingAgent = agents.find((c) => c.id === id);
  // const agent = existingAgent ?? initialFieldValues;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agentSchema),
    defaultValues: existingAgent || initialFieldValues,
  });

  const theme = useTheme();

  useEffect(() => {
    reset(existingAgent || initialFieldValues);
  }, [existingAgent, reset]);

  const onSubmit = (data: INewAgent | Agent) => {
    const processedData = {
      ...data,
      name: `${data.firstName} ${data.lastName}`,
    };

    if (isNew) {
      dispatch(addAgent(processedData as INewAgent));
    } else if (id && typeof id === 'string') {
      dispatch(updateAgent({ ...processedData } as IAgent));
    }

    appRouter.push('/agents');
  };

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Paper sx={{ px: 5, py: 5 }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Agent Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          {/** Company */}
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  label="Company"
                  value={field.value}
                  error={errors.company?.message}
                  required
                />
              )}
            />
          </Grid>

          {/** Name */}
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
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
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
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

          {/** Account */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex', alignItems: 'flexStart' }}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <ControllerBox>
                  <SelectDropdown
                    label="Role"
                    value={field.value}
                    options={roleArray()}
                    onChange={field.onChange}
                    error={errors.role?.message}
                  />
                </ControllerBox>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex', alignItems: 'flexStart' }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <ControllerBox>
                  <RadioGroupGenerator
                    {...field}
                    control={control}
                    label="Status"
                    items={statusArray}
                  />
                </ControllerBox>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex', alignItems: 'flexStart' }}>
            <Controller
              name="isVerified"
              control={control}
              render={({ field }) => (
                <ControllerBox>
                  <CheckboxGenerator {...field} label="Is Verified" checked={field.value} />
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
        autoHideDuration={AGENT_DURATION}
        onClose={handleClose}
      />
    </Paper>
  );
}

export default AgentForm;
