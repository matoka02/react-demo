import { createAsyncThunk } from '@reduxjs/toolkit';

import { IApiUserTask, IUserTask } from '@/stores/types/newModelTypes';

/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const fetchTasks = createAsyncThunk<IUserTask[], void, { rejectValue: string }>(
  'todos/fetchTodos',
  async () =>
    // _:any, {rejectWithValue}:any
    {
      const response = await fetch(`${API_URL}?userId=1`);

      if (!response.ok) throw new Error('Error loading user task');

      const data: IApiUserTask[] = await response.json();

      if (!data) throw new Error('Invalid user tasks data from API');

      const userTasks = data.map((task: any) => ({
        userId: task.userId,
        id: task.id,
        title: task.title,
        completed: task.completed,
        state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
      }));

      return userTasks;
    }
);

export default fetchTasks;
