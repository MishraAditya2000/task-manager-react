import React, { useState } from 'react';
import AddTask from './AddTask';
import { CheckIcon, CrossIcon, PlusIcon, SearchIcon } from '../Icons';
import SearchTasks from './SearchTask';
import TaskList from './TaskList';
import { Task, TaskDraft, parseISODate, toISODate } from '@constants/types';
import WeekStrip, { getWeekDays } from '@components/WeekStrip/WeekStrip';

const today = toISODate(new Date());
const pad = (n: number) => String(n).padStart(2, '0');

const seed: Task[] = [
  { id: '1', title: 'Finishing Wireframe', start: '10:00', end: '12:00', date: today, description: 'Complete the home and search screens', priority: 'High', done: false },
  { id: '2', title: 'Meeting with team', start: '14:00', end: '15:00', date: today, description: 'Sprint planning and design review', priority: 'Medium', done: false },
  { id: '3', title: 'Buy a cat food', start: '17:00', end: '17:30', date: today, description: '', priority: 'Low', done: true },
  { id: '4', title: 'Finishing daily commission', start: '18:00', end: '19:00', date: today, description: '', priority: 'Medium', done: true },
];

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(seed);
  const [selected, setSelected] = useState(today);
  const [searching, setSearching] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  // Tasks of the selected Mon–Sun week
  const weekDates = getWeekDays(parseISODate(selected)).map(toISODate);
  const weekTasks = tasks.filter((t) => weekDates.includes(t.date));

  const completed = weekTasks.filter((t) => t.done).length;
  const pending = weekTasks.length - completed;
  const progress = weekTasks.length ? Math.round((completed / weekTasks.length) * 100) : 0;

  const visible = tasks.filter((t) => t.date === selected);

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const openAdd = () => {
    setEditing(null);
    setSheetOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setSheetOpen(true);
  };

  const handleSubmit = (draft: TaskDraft) => {
    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...draft } : t)));
    } else {
      setTasks((prev) => [...prev, { ...draft, id: crypto.randomUUID(), done: false }]);
    }
    setSelected(draft.date);
    setSheetOpen(false);
  };

  // Search view replaces the home view
  if (searching) {
    return (
      <SearchTasks
        weekTasks={[...weekTasks].sort(
          (a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start),
        )}
        onToggle={toggle}
        onBack={() => setSearching(false)}
      />
    );
  }

  return (
    <div className="px-5 pb-28 pt-5">
      {/* Search bar: opens the search view */}
      <button
        type="button"
        onClick={() => setSearching(true)}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 text-left"
      >
        <span className="text-sm text-slate-500">Search for a task</span>
        <SearchIcon width={20} height={20} className="text-slate-800" />
      </button>

      {/* Week strip */}
      <div className="mt-5">
        <WeekStrip selected={selected} onSelect={setSelected} />
      </div>

      {/* Stat cards */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 rounded-lg bg-[#EEF0FF] p-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#2F4BDB] bg-[#C7CFFF] text-[#2F4BDB]">
            <CheckIcon width={16} height={16} />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] text-slate-700">Task Complete</p>
            <p className="text-[26px] font-semibold">
              {pad(completed)} <span className="text-[10px] font-normal text-slate-500">This Week</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#FFE7E9] p-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#E5383B] bg-[#FFC2C6] text-[#E5383B]">
            <CrossIcon width={16} height={16} />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] text-slate-700">Task Pending</p>
            <p className="text-[26px] font-semibold">
              {pad(pending)} <span className="text-[10px] font-normal text-slate-500">This Week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Weekly progress */}
      <h3 className="mt-7 text-[17px] font-semibold">Weekly Progress</h3>
      <div className="mt-3 h-4 w-full overflow-hidden bg-[#D9DBFF]">
        <div className="h-full bg-[#2B3A9F] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Tasks today */}
      <div className="mt-7 flex items-center justify-between">
        <h3 className="text-[17px] font-semibold">{selected === today ? 'Tasks Today' : 'Tasks'}</h3>
        <button type="button" className="text-[13px] font-medium text-[#2F4BDB]">
          View All
        </button>
      </div>

      <div className="mt-2">
        <TaskList tasks={visible} onToggle={toggle} onDelete={remove} onEdit={openEdit} />
      </div>

      <button
        type="button"
        onClick={openAdd}
        aria-label="Add task"
        className="fixed bottom-6 left-1/2 z-30 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#4361EE] text-white shadow-lg active:scale-95"
      >
        <PlusIcon width={26} height={26} />
      </button>

      <AddTask
        open={sheetOpen}
        defaultDate={selected}
        initial={editing}
        onClose={() => setSheetOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ToDoList;