export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
export type Priority = (typeof PRIORITIES)[number];


export interface Task {
  id: string;
  title: string;
  start: string; // "HH:mm"
  end: string; // "HH:mm"
  date: string; // "YYYY-MM-DD"
  description: string;
  priority: Priority;
  done: boolean;
}

export type TaskDraft = Omit<Task, 'id' | 'done'>;

export const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const parseISODate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};