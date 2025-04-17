import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectErrorTasks } from '@/stores/task/taskSelectors';
import fetchTasks from '@/stores/task/taskThunk';

import TaskList from './TaskList';

function InboxScreen(): React.ReactElement {
  const dispatch = useAppDispatch();
  // We're retrieving the error field from our updated store
  const error = useAppSelector(selectErrorTasks);
  // The useEffect triggers the data fetching when the component is mounted
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <div className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <div>
        <h1 className="title-page">Taskbox</h1>
      </div>
      <TaskList />
    </div>
  );
}

export default InboxScreen;
