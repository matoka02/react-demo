import React from 'react';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectFilteredTasks, selectTaskStatus } from '@/stores/task/taskSelectors';
import { updateTaskState } from '@/stores/task/taskSlice';

import { Task, TaskType } from './Task';
import '../../../styles/storybook.globals.css';

export interface TaskListProps {
  loading: boolean;
  tasks: TaskType[];
  // onPinTask: Function;
  // onArchiveTask: Function;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

export default function TaskList(): React.ReactElement {
  const tasks = useAppSelector(selectFilteredTasks);
  const status = useAppSelector(selectTaskStatus);

  const dispatch = useAppDispatch();

  const pinTask = (id: string) => {
    // We're dispatching the Pinned event back to our store
    dispatch(
      updateTaskState({
        id: Number(id),
        newTaskState: 'TASK_PINNED',
      })
    );
  };

  const archiveTask = (id: string) => {
    // We're dispatching the Archive event back to our store
    dispatch(
      updateTaskState({
        id: Number(id),
        newTaskState: 'TASK_ARCHIVED',
      })
    );
  };
  const LoadingRow = (
    <div className="loading-item">
      <div className="glow-checkbox" />
      <div className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </div>
    </div>
  );
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key="loading">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key="empty" data-testid="empty">
        <div className="wrapper-message">
          <div className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key="success">
      {tasks.map((task: any) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(t: any) => pinTask(t)}
          onArchiveTask={(t: any) => archiveTask(t)}
        />
      ))}
    </div>
  );
}
