import React, { useEffect, useState } from 'react';
import { CalendarIcon, ClockIcon, CloseIcon } from '@components/Icons';
import { Task, TaskDraft } from '@constants/types';

interface AddTaskProps {
  open: boolean;
  defaultDate: string;
  initial?: Task | null;
  onClose: () => void;
  onSubmit: (draft: TaskDraft) => void;
}

const fieldBox =
  'flex h-11 w-full items-center gap-2 border border-slate-200 bg-white px-3 text-sm text-slate-700';

const AddTask: React.FC<AddTaskProps> = ({ open, defaultDate, initial, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Reset / prefill every time the sheet opens
  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? '');
    setStart(initial?.start ?? '');
    setEnd(initial?.end ?? '');
    setDate(initial?.date ?? defaultDate);
    setDescription(initial?.description ?? '');
    setError('');
  }, [open, initial, defaultDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }
    if (start && end && end < start) {
      setError('End time must be after start time.');
      return;
    }
    onSubmit({ title: title.trim(), start, end, date, description: description.trim() });
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-200 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* sheet */}
      <form
        onSubmit={handleSubmit}
        className={`absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-5 pb-6 pt-5 shadow-xl transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold">{initial ? 'Edit Task' : 'Add New Task'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-slate-800">
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <label className="mb-1.5 block text-xs text-slate-600">Task title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Doing Homework"
          className={`${fieldBox} mb-4 outline-none focus:border-[#2F4BDB]`}
        />

        <label className="mb-1.5 block text-xs text-slate-600">Set Time</label>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className={fieldBox}>
            <ClockIcon width={16} height={16} className="shrink-0 text-slate-500" />
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              aria-label="Start time"
              className="w-full bg-transparent outline-none"
            />
          </label>
          <label className={fieldBox}>
            <ClockIcon width={16} height={16} className="shrink-0 text-slate-500" />
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              aria-label="End time"
              className="w-full bg-transparent outline-none"
            />
          </label>
        </div>

        <label className="mb-1.5 block text-xs text-slate-600">Set Date</label>
        <label className={`${fieldBox} mb-4 justify-between`}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
          {/* <CalendarIcon width={16} height={16} className="shrink-0 text-slate-500" /> */}
        </label>

        <label className="mb-1.5 block text-xs text-slate-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description"
          rows={4}
          className="mb-5 w-full resize-none  border border-slate-200 bg-white p-3 text-sm outline-none focus:border-[#2F4BDB]"
        />

        {error && <p className="mb-3 text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          className="h-12 w-full bg-[#4361EE] text-[15px] font-medium text-white active:scale-[0.99]"
        >
          {initial ? 'Save task' : 'Create task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;