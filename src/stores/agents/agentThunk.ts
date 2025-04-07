import { createAsyncThunk } from '@reduxjs/toolkit';

import { HttpMethod } from '../types/httpTypes';

import { IAgent, INewAgent } from '@/stores/types/modelTypes';

export const fetchAllAgents = createAsyncThunk<IAgent[], void, { rejectValue: string }>(
  'agent/fetchAllAgents',
  async (_: any, { rejectWithValue }: any) => {
    try {
      const response = await fetch('/api/agents', { method: HttpMethod.GET });

      if (!response.ok) throw new Error('Error loading agents');

      const agents: IAgent[] = await response.json();

      if (!agents) throw new Error('Invalid agent data from API');

      return agents;
    } catch (error: any) {
      // console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAgentById = createAsyncThunk<IAgent, string, { rejectValue: string }>(
  'agent/fetchAgentById',
  async (agentId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/agents/${agentId}`, { method: HttpMethod.GET });

      if (!response.ok) throw new Error('Agent not found');

      const data: IAgent = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredAgents = createAsyncThunk<
  IAgent[],
  { firstName: string; lastName: string },
  { rejectValue: string }
>(
  'agent/fetchFilteredAgents',
  async (filters: { firstName: string; lastName: string }, { rejectWithValue }: any) => {
    try {
      const query = new URLSearchParams(filters).toString();

      const response = await fetch(`/api/agents?${query}`, { method: HttpMethod.GET });

      const data: IAgent[] = await response.json();

      if (data.length === 0) return rejectWithValue('No agents found');

      return data;
    } catch (error: any) {
      // console.error(error.message);
      return rejectWithValue('Error fetching filtered agents');
    }
  }
);

export const deleteAgent = createAsyncThunk<string, string, { rejectValue: string }>(
  'agent/deleteAgent',
  async (agentId: string, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/agents`, {
        method: HttpMethod.DELETE,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: agentId }),
      });

      if (!response.ok) throw new Error('Error deleting agent. Please, try again');

      const data = await response.json();
      return data.id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAgent = createAsyncThunk<IAgent, INewAgent, { rejectValue: string }>(
  'agent/addAgent',
  async (newAgent: INewAgent, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/agents`, {
        method: HttpMethod.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgent),
      });

      if (!response.ok) throw new Error('Error adding agent');

      const data: IAgent = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAgent = createAsyncThunk<IAgent, IAgent, { rejectValue: string }>(
  'agent/updateAgent',
  async (updatedAgent: IAgent, { rejectWithValue }: any) => {
    try {
      const response = await fetch(`/api/agents/${updatedAgent.id}`, {
        method: HttpMethod.PUT,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAgent),
      });

      if (!response.ok) throw new Error('Error updating agent');

      const data: IAgent = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
