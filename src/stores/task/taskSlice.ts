import { createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IUserTask } from '@/stores/types/newModelTypes';

import fetchTasks from './taskThunk';

interface IUserTaskState {
  tasks: IUserTask[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

/*
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let's not worry about that now
 */
const defaultTasks: IUserTask[] = [
  { userId: 1, id: 1, title: 'Something', completed: false },
  { userId: 1, id: 2, title: 'Something more', completed: false },
  { userId: 1, id: 3, title: 'Something else', completed: false },
  { userId: 1, id: 4, title: 'Something again', completed: false },
];
const initialState: IUserTaskState = {
  tasks: defaultTasks,
  status: 'idle',
  error: null,
};

// pending
const handleTaskPending = (state: IUserTaskState) => ({
  ...state,
  tasks: [],
  status: 'loading' as const,
  error: null,
});

// All tasks
const handleFetchAllTasksFulfilled = (
  state: IUserTaskState,
  action: PayloadAction<IUserTask[]>
) => ({
  ...state,
  tasks: action.payload,
  status: 'succeeded' as const,
  error: null,
});
const handleFetchAllTasksRejected = (state: IUserTaskState, action: PayloadAction<any>) => ({
  ...state,
  tasks: [],
  status: 'failed' as const,
  error: action.payload,
});

const tasksSlice = createSlice({
  name: 'taskbox',
  initialState,
  reducers: {
    updateTaskState: (state, action: PayloadAction<{ id: number; newTaskState: boolean }>) => {
      const { id, newTaskState } = action.payload;
      // const taskIndex = state.tasks.findIndex((t: any) =>t.id === id);
      // if (taskIndex >= 0) {
      //   state.tasks[taskIndex].completed = newTaskState;
      // }

      const mapUpdatedTasks = (tasks: IUserTask[]): IUserTask[] =>
        tasks.map((task) => (task.id === id ? { ...task, completed: newTaskState } : task));

      return {
        ...state,
        tasks: mapUpdatedTasks(state.tasks),
      };
    },
  },
  /*
   * Extends the reducer for the async actions
   * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
   */
  extraReducers(builder: ActionReducerMapBuilder<IUserTaskState>) {
    builder
      .addCase(fetchTasks.pending, handleTaskPending)
      .addCase(fetchTasks.fulfilled, handleFetchAllTasksFulfilled)
      .addCase(fetchTasks.rejected, handleFetchAllTasksRejected);
  },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = tasksSlice.actions;
export default tasksSlice.reducer;
