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
import SelectDropdown from '@/components/controls/Select';
import SnapNotice from '@/components/controls/SnapNotice';
import { initialFieldValues, toFormAgent, useAgentForm } from '@/components/form/useAgentForm';
import { roleArray } from '@/lib/_mock';
import { useAppRouter } from '@/routes/hooks';
import { hideSnackbar, AGENT_DURATION } from '@/stores/agents/agentSlice';
import { addAgent, updateAgent } from '@/stores/agents/agentThunk';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { RootState } from '@/stores/store';
import { IAgent, INewAgent } from '@/stores/types/newModelTypes';

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

  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(agentSchema),
  //   defaultValues: existingAgent || initialFieldValues,
  // });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useAgentForm(existingAgent);

  const theme = useTheme();

  useEffect(() => {
    reset(existingAgent ? toFormAgent(existingAgent) : initialFieldValues);
  }, [existingAgent, reset]);

  const onSubmit = (data: INewAgent) => {
    const processedData = {
      ...data,
      name: `${data.firstName} ${data.lastName}`,
    };

    if (isNew) {
      dispatch(addAgent(processedData));
    } else if (id && typeof id === 'string') {
      dispatch(updateAgent({ ...(processedData as Omit<IAgent, 'id'>), id }));
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
