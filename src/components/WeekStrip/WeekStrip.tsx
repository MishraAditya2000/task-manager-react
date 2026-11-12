import React from 'react';
const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Returns the 7 days (Mon → Sun) of the week containing `date`. */
export const getWeekDays = (date: Date): Date[] => {
  const d = new Date(date);
  const offset = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - offset);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    return day;
  });
};

interface WeekStripProps {
  selected: string; // YYYY-MM-DD
  onSelect: (iso: string) => void;
}

const WeekStrip: React.FC<WeekStripProps> = ({ selected, onSelect }) => {
  const days = getWeekDays(new Date(selected));

  return (
    <div className="flex items-center justify-between">
      {days.map((day, i) => {
        const iso = toISODate(day);
        const active = iso === selected;
        return (
          <button
            key={iso}
            type="button"
            onClick={() => onSelect(iso)}
            className={`flex h-[58px] w-[40px] flex-col items-center justify-center rounded-lg transition-colors ${
              active ? 'bg-[#2F4BDB] text-white' : 'text-slate-400'
            }`}
          >
            <span className="text-[11px] font-medium leading-none">{DAY_LABELS[i]}</span>
            <span className="mt-1.5 text-[15px] font-medium leading-none">
              {String(day.getDate()).padStart(2, '0')}
            </span>
            <span
              className={`mt-1 h-1 w-1 rounded-full ${active ? 'bg-white' : 'bg-transparent'}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default WeekStrip;