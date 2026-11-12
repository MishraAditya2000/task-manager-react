import React from 'react';
import { CheckIcon, EditIcon, TrashIcon } from '@components/Icons';
import { Task } from '@constants/types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-400">No tasks for this day.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center gap-3 border-b border-slate-200 py-4 last:border-b-0"
        >
          <button
            type="button"
            aria-label={task.done ? 'Mark as pending' : 'Mark as complete'}
            onClick={() => onToggle(task.id)}
            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border-[1.5px] ${
              task.done ? 'border-[#2F4BDB] text-[#2F4BDB]' : 'border-[#2F4BDB]/70 text-transparent'
            }`}
          >
            <CheckIcon width={12} height={12} />
          </button>

          <span
            className={`flex-1 truncate text-[15px] font-medium ${
              task.done ? 'text-slate-500 line-through' : 'text-slate-900'
            }`}
          >
            {task.title}
          </span>

          <button
            type="button"
            aria-label="Delete task"
            onClick={() => onDelete(task.id)}
            className="text-slate-400 hover:text-red-500"
          >
            <TrashIcon width={20} height={20} />
          </button>
          <button
            type="button"
            aria-label="Edit task"
            onClick={() => onEdit(task)}
            className="text-slate-400 hover:text-[#2F4BDB]"
          >
            <EditIcon width={20} height={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
