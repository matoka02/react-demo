import React from 'react';

export interface TaskType {
  id: string;
  title: string;
  // state: string;
  state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
}

export interface TaskProps {
  task: TaskType;
  // onPinTask: Function;
  // onArchiveTask:  Function;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

export function Task({ task, onArchiveTask, onPinTask }: TaskProps): React.ReactElement {
  const { id, title, state } = task;
  return (
    <div className={`list-item ${state}`}>
      <label htmlFor={`archiveTask-${id}`} aria-label={`archiveTask-${id}`} className="checkbox">
        <input
          type="checkbox"
          disabled
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span
          role="button"
          tabIndex={0}
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onArchiveTask(id);
          }}
        />
      </label>

      <label htmlFor={`title-${id}`} aria-label={title} className="title">
        <input
          type="text"
          value={title}
          readOnly
          name="title"
          id={`title-${id}`}
          placeholder="Input title"
          style={{ textOverflow: 'ellipsis' }}
        />
      </label>

      {state !== 'TASK_ARCHIVED' && (
        <button
          type="button"
          className="pin-button"
          onClick={() => onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          // key={`pinTask-${id}`}
        >
          <span className="icon-star" />
        </button>
      )}
    </div>
  );
}
