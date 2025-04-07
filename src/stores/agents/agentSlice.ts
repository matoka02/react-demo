import { createSlice, PayloadAction, ActionReducerMapBuilder, Action } from '@reduxjs/toolkit';

import {
  addAgent,
  deleteAgent,
  fetchAllAgents,
  fetchAgentById,
  // fetchFilteredAgents,
  updateAgent,
} from './agentThunk';

import { IAgent, INewAgent } from '@/stores/types/modelTypes';

interface AgentState {
  agents: IAgent[];
  agent: INewAgent | null;
  isLoading: boolean;
  error?: string;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: AgentState = {
  agents: [],
  agent: null,
  isLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
};

// pending
const handleAgentPending = (state: AgentState) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

// All agents
const handleFetchAllAgentsFulfilled = (state: AgentState, action: PayloadAction<IAgent[]>) => ({
  ...state,
  isLoading: false,
  agents: action.payload,
});
const handleFetchAllAgentsRejected = (state: AgentState, action: PayloadAction<any>) => ({
  ...state,
  isLoading: false,
  error: action.payload,
  snackbar: {
    open: true,
    message: action.payload,
    severity: 'error' as const,
  },
});

// Agent by ID
const handleFetchAgentByIdFulfilled = (state: AgentState, action: PayloadAction<IAgent>) => ({
  ...state,
  isLoading: false,
  agents: [...state.agents, action.payload],
});
const handleFetchAgentByIdRejected = (
  state: AgentState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'warning' as const,
  },
});

// // Find agents
// const handleFilteredAgentsFulfilled = (
//   state: AgentState,
//   action: PayloadAction<IAgent[]>
// ) => ({
//   ...state,
//   isLoading: false,
//   agents: action.payload,
//   snackbar:{
//     open: action.payload.length === 0 ? true : state.snackbar.open,
//     message: action.payload.length === 0 ? 'No agents found' : state.snackbar.message,
//     severity: action.payload.length === 0 ? ('warning' as const) : state.snackbar.severity,
//   }
// });
// const handleFilteredAgentsRejected = (
//   state: AgentState,
//   action: PayloadAction<string | undefined>
// ) => ({
//   ...state,
//   isLoading: false,
//   error: action.payload,
//   snackbar:{
//     open: true ,
//     message: action.payload ?? 'Unknown error',
//     severity: action.payload === 'No agents found' ? ('warning' as const) : ('error' as const),
//   }
// });

// Delete agent
const handleDeleteAgentFulfilled = (state: AgentState, action: PayloadAction<string>) => ({
  ...state,
  isLoading: false,
  agents: state.agents.filter((agent) => agent.id !== String(action.payload)),
  snackbar: {
    open: true,
    message: `Agent deleted successfully!`,
    severity: 'success' as const,
  },
});
const handleDeleteAgentRejected = (
  state: AgentState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'error' as const,
  },
});

// Add agent
const handleAddAgentFulfilled = (state: AgentState, action: PayloadAction<IAgent>) => ({
  ...state,
  isLoading: false,
  agents: [...state.agents, action.payload],
  snackbar: {
    open: true,
    message: `Agent added successfully!`,
    severity: 'success' as const,
  },
});
const handleAddAgentRejected = (state: AgentState, action: PayloadAction<string | undefined>) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'error' as const,
  },
});

// Update agent
const handleUpdateAgentFulfilled = (state: AgentState, action: PayloadAction<IAgent>) => ({
  ...state,
  isLoading: false,
  agents: state.agents.map((agent) => (agent.id === action.payload.id ? action.payload : agent)),
  snackbar: {
    open: true,
    message: `Agent updated successfully!`,
    severity: 'success' as const,
  },
});
const handleUpdateAgentRejected = (
  state: AgentState,
  action: PayloadAction<string | undefined>
) => ({
  ...state,
  isLoading: false,
  snackbar: {
    open: true,
    message: `${action.payload}`,
    severity: 'error' as const,
  },
});

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: 'success' | 'error' | 'warning' | 'info';
      }>
    ) => ({
      ...state,
      snackbar: {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      },
    }),
    hideSnackbar: (state) => ({
      ...state,
      snackbar: {
        open: false,
        message: '',
        severity: 'info',
      },
    }),
  },
  extraReducers: (builder: ActionReducerMapBuilder<AgentState>) => {
    builder
      // All agents
      .addCase(fetchAllAgents.fulfilled, handleFetchAllAgentsFulfilled)
      .addCase(fetchAllAgents.rejected, handleFetchAllAgentsRejected)
      // Agent by ID
      .addCase(fetchAgentById.fulfilled, handleFetchAgentByIdFulfilled)
      .addCase(fetchAgentById.rejected, handleFetchAgentByIdRejected)
      // // Find agents
      // .addCase(fetchFilteredAgents.fulfilled, handleFilteredAgentsFulfilled)
      // .addCase(fetchFilteredAgents.rejected, handleFilteredAgentsRejected)
      // Delete agent
      .addCase(deleteAgent.fulfilled, handleDeleteAgentFulfilled)
      .addCase(deleteAgent.rejected, handleDeleteAgentRejected)
      // Add agent
      .addCase(addAgent.fulfilled, handleAddAgentFulfilled)
      .addCase(addAgent.rejected, handleAddAgentRejected)
      // Update agent
      .addCase(updateAgent.fulfilled, handleUpdateAgentFulfilled)
      .addCase(updateAgent.rejected, handleUpdateAgentRejected)
      // pending
      .addMatcher((action: Action) => action.type.endsWith('/pending'), handleAgentPending);
  },
});

export const AGENT_DURATION = 3000;
export const { showSnackbar, hideSnackbar } = agentSlice.actions;
export default agentSlice.reducer;
