import React, { useState } from 'react';
import { ArrowLeftIcon, CheckIcon, SearchIcon } from '../Icons';
import { Task } from '../../constants/types';

interface SearchTasksProps {
  weekTasks: Task[]; // tasks of the selected week (already filtered by the parent)
  onToggle: (id: string) => void;
  onBack: () => void;
}

const SearchTasks: React.FC<SearchTasksProps> = ({ weekTasks, onToggle, onBack }) => {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // Match title OR description; empty query shows the whole week
  const results = weekTasks.filter(
    (t) => !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
  );

  return (
    <div className="min-h-full px-6 pb-10 pt-8">
      <button type="button" onClick={onBack} aria-label="Go back">
        <ArrowLeftIcon width={22} height={22} />
      </button>

      <div className="mt-6 flex h-12 items-center border border-slate-200 bg-white px-4">
        <input
          autoFocus
          type="text"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a task"
          className="w-full bg-transparent text-sm outline-hidden placeholder:text-slate-400"
        />
        <SearchIcon width={20} height={20} className="shrink-0" />
      </div>

      {results.length === 0 ? (
        <p className="mt-12 text-center text-sm text-slate-400">No tasks found this week.</p>
      ) : (
        <ul className="mt-7">
          {results.map((task) => (
            <li key={task.id} className="flex items-start gap-3">
              <button
                type="button"
                aria-label={task.done ? 'Mark as pending' : 'Mark as complete'}
                onClick={() => onToggle(task.id)}
                className={`mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border-[1.5px] ${
                  task.done ? 'border-[#2F4BDB] text-[#2F4BDB]' : 'border-[#2F4BDB]/70 text-transparent'
                }`}
              >
                <CheckIcon width={12} height={12} />
              </button>

              <div className="mb-4 min-w-0 flex-1 border-b border-slate-200 pb-4">
                <p
                  className={`truncate text-[15px] font-medium ${
                    task.done ? 'text-slate-600 line-through' : 'text-slate-900'
                  }`}
                >
                  {task.title}
                </p>
                {/* show description only when it is why the task matched */}
                {q && !task.title.toLowerCase().includes(q) && (
                  <p className="mt-1 truncate text-xs text-slate-400">{task.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchTasks;