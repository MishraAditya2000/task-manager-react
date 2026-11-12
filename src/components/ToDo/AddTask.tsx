import React, { useEffect, useState,useRef } from 'react';
import { CalendarIcon, ClockIcon, CloseIcon, ChevronDownIcon } from '@components/Icons';
import { Task, TaskDraft, PRIORITIES, Priority } from '@constants/types';

interface AddTaskProps {
  open: boolean;
  defaultDate: string;
  initial?: Task | null;
  onClose: () => void;
  onSubmit: (draft: TaskDraft) => void;
}


const fieldBox =
  'flex h-11 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700';
 
const AddTask: React.FC<AddTaskProps> = ({ open, defaultDate, initial, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [priorityOpen, setPriorityOpen] = useState(false);
  const priorityRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
 
  // Close the priority list on outside click or Escape
  useEffect(() => {
    if (!priorityOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (priorityRef.current && !priorityRef.current.contains(e.target as Node)) {
        setPriorityOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPriorityOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [priorityOpen]);
 
  // Reset / prefill every time the sheet opens
  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? '');
    setStart(initial?.start ?? '');
    setEnd(initial?.end ?? '');
    setDate(initial?.date ?? defaultDate);
    setDescription(initial?.description ?? '');
    setPriority(initial?.priority ?? 'Medium');
    setPriorityOpen(false);
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
    onSubmit({ title: title.trim(), start, end, date, description: description.trim(), priority });
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
        className={`absolute inset-x-0 bottom-0 max-h-[92%] overflow-y-auto rounded-t-2xl bg-white px-5 pb-6 pt-5 shadow-xl transition-transform duration-300 ${
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
          className={`${fieldBox} mb-4 outline-hidden focus:border-[#2F4BDB]`}
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
              className="w-full bg-transparent outline-hidden"
            />
          </label>
          <label className={fieldBox}>
            <ClockIcon width={16} height={16} className="shrink-0 text-slate-500" />
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              aria-label="End time"
              className="w-full bg-transparent outline-hidden"
            />
          </label>
        </div>
 
        <label className="mb-1.5 block text-xs text-slate-600">Set Date</label>
        <label className={`${fieldBox} mb-4 justify-between`}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-hidden"
          />
          <CalendarIcon width={16} height={16} className="shrink-0 text-slate-500" />
        </label>
 
        <label className="mb-1.5 block text-xs text-slate-600">Priority</label>
        {/* Custom dropdown: rendered in the page, so no native popup quirks */}
        <div ref={priorityRef} className="relative mb-4">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={priorityOpen}
            onClick={() => setPriorityOpen((o) => !o)}
            className={`flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm text-slate-700 ${
              priorityOpen ? 'border-[#2F4BDB]' : 'border-slate-200'
            }`}
          >
            <span>{priority}</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-slate-500 transition-transform ${priorityOpen ? 'rotate-180' : ''}`}
            />
          </button>
 
          {priorityOpen && (
            <ul
              role="listbox"
              className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
            >
              {PRIORITIES.map((p) => (
                <li key={p} role="option" aria-selected={p === priority}>
                  <button
                    type="button"
                    onClick={() => {
                      setPriority(p);
                      setPriorityOpen(false);
                    }}
                    className={`block w-full px-3 py-2.5 text-left text-sm ${
                      p === priority
                        ? 'bg-[#EEF0FF] font-medium text-[#2F4BDB]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
 
        <label className="mb-1.5 block text-xs text-slate-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description"
          rows={4}
          className="mb-5 w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm outline-hidden focus:border-[#2F4BDB]"
        />
 
        {error && <p className="mb-3 text-xs text-red-500">{error}</p>}
 
        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-[#4361EE] text-[15px] font-medium text-white active:scale-[0.99]"
        >
          {initial ? 'Save task' : 'Create task'}
        </button>
      </form>
    </div>
  );
};
 
export default AddTask;
 