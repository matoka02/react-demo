import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { updateTaskState } from '@/stores/task/taskSlice';
import React from 'react';
import { Task, TaskType } from './Task';
import { selectFilteredTasks, selectTaskStatus } from '@/stores/task/taskSelectors';

export interface TaskListProps {
  loading: boolean;
  tasks: TaskType[];
  onPinTask: Function;
  onArchiveTask: Function;
}

export default function TaskList(): React.ReactElement {
  // // We're retrieving our state from the store
  // const tasks = useAppSelector((state: any) => {
  //   const tasksInOrder = [
  //     ...state.userTasks.tasks.filter((t: any) => t.state === 'TASK_PINNED'),
  //     ...state.userTasks.tasks.filter((t: any) => t.state !== 'TASK_PINNED'),
  //   ];
  //   const filteredTasks = tasksInOrder.filter(
  //     (t: any) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
  //   );
  //   return filteredTasks;
  // });

  // const { status } = useAppSelector((state: any) => state.userTasks);

  // const dispatch = useAppDispatch();

  // const pinTask = (value: any) => {
  //   // We're dispatching the Pinned event back to our store
  //   dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  // };
  // const archiveTask = (value: any) => {
  //   // We're dispatching the Archive event back to our store
  //   dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  // };

  const tasks = useAppSelector(selectFilteredTasks);
  const status = useAppSelector(selectTaskStatus);

  const dispatch = useAppDispatch();

  const pinTask = (id: string) => {
    dispatch(updateTaskState({
      id: Number(id), // Конвертируем string в number
      newTaskState: 'TASK_PINNED'
    }));
  };

  const archiveTask = (id: string) => {
    dispatch(updateTaskState({
      id: Number(id),
      newTaskState: 'TASK_ARCHIVED'
    }));
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
