import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fireEvent, waitFor, within } from '@storybook/test';
import React from 'react';
import { Provider } from 'react-redux';

import { TaskType } from '@/components/SB/Task';
import TaskList from '@/components/SB/TaskList';

import * as TaskStories from './Task.stories';

interface MockStoreState {
  tasks: TaskType[];
  // status: 'idle' | 'loading' | 'succeeded' | 'failed';
  status: string;
  error: string | null;
}

interface MockStoreProps {
  userTasksState: MockStoreState;
  children: React.ReactNode;
}

// A simple mock of the state of the store
export const MockedState: MockStoreState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1', state: 'TASK_INBOX' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2', state: 'TASK_INBOX' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3', state: 'TASK_INBOX' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4', state: 'TASK_INBOX' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5', state: 'TASK_INBOX' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6', state: 'TASK_INBOX' },
  ],
  status: 'idle',
  error: null,
};

// A super-simple mock of a redux store
function Mockstore({ userTasksState, children }: MockStoreProps) {
  return (
    <Provider
      store={configureStore({
        reducer: {
          userTasks: createSlice({
            name: 'userTasks',
            initialState: userTasksState,
            reducers: {
              updateTaskState: (state, action) => {
                const { id, newTaskState } = action.payload;
                // const task = state.tasks.findIndex((t: TaskType) => t.id === id);
                // if (task >= 0) {
                //   state.tasks[task].state = newTaskState;
                // }
                return {
                  ...state,
                  tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, state: newTaskState } : task
                  ),
                };
              },
            },
          }).reducer,
        },
      })}
    >
      {children}
    </Provider>
  );
}

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story: any) => <div style={{ margin: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
};

export const Default = {
  decorators: [(story: any) => <Mockstore userTasksState={MockedState}>{story()}</Mockstore>],

  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    // Waits for the component to transition from the loading state
    // await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
    // Waits for the component to be updated based on the store
    // await waitFor(async () => {
    //   // Simulates pinning the first task
    //   await fireEvent.click(canvas.getByLabelText('Task 1'));
    //   // Simulates pinning the third task
    //   await fireEvent.click(canvas.getByLabelText('Task 3'));
    // });
    fireEvent.click(canvas.getByLabelText('Task 1'));
    fireEvent.click(canvas.getByLabelText('Task 3'));
    await waitFor(() => {});
  },
};

export const WithPinnedTasks = {
  decorators: [
    // (story: any) => {
    //   const pinnedtasks = [
    //     ...MockedState.tasks.slice(0, 5),
    //     { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    //   ];

    //   return (
    //     <Mockstore
    //       userTasksState={{
    //         ...MockedState,
    //         tasks: pinnedtasks,
    //       }}
    //     >
    //       {story()}
    //     </Mockstore>
    //   );
    // },
    (story: any) => (
      <Mockstore
        userTasksState={{
          ...MockedState,
          tasks: [
            ...MockedState.tasks.slice(0, 5),
            { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
          ],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Loading = {
  decorators: [
    (story: any) => (
      // <Mockstore
      //   userTasksState={{
      //     ...MockedState,
      //     status: 'loading',
      //   }}
      // >
      //   {story()}
      // </Mockstore>
      <Mockstore
        userTasksState={{
          ...MockedState,
          status: 'loading',
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    await canvas.findByTestId('loading');
  },
};

export const Empty = {
  decorators: [
    (story: any) => (
      <Mockstore
        userTasksState={{
          ...MockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
