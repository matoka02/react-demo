/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver } from 'react-hook-form';
import * as Yup from 'yup';

import { IAgent, INewAgent } from '@/stores/types/newModelTypes';
import { omitKey } from '@/utils/objectUtils';

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

export const initialFieldValues: INewAgent = {
  company: '',
  name: '',
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

export const toFormAgent = (agent: IAgent): INewAgent => omitKey(agent, 'id');

export const useAgentForm = (existingAgent?: IAgent) =>
  useForm<INewAgent>({
    resolver: yupResolver(agentSchema) as Resolver<INewAgent>,
    defaultValues: existingAgent ? omitKey(existingAgent, 'id') : initialFieldValues,
  });
