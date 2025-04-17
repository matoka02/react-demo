import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectAllTasks = (state: RootState) => state.userTasks.tasks;
export const selectTaskStatus = (state: RootState) => state.userTasks.status;

export const selectFilteredTasks = createSelector(
  [selectAllTasks],
  (tasks) => {
    const tasksInOrder = [
      ...tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    return tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
  }
);
