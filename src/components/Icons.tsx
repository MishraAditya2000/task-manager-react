import React from 'react';

type P = React.SVGProps<SVGSVGElement>;

const base: P = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const TrashIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3" />
  </svg>
);

export const EditIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} strokeWidth={3} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const CrossIcon = (p: P) => (
  <svg {...base} strokeWidth={2.6} {...p}>
    <path d="M7 7l10 10M17 7L7 17" />
  </svg>
);

export const ArrowLeftIcon=(p: P) => (
  <svg {...base} strokeWidth={2.6} {...p}>
      <path d="m12 19-7-7 7-7"/>
  <path d="M19 12H5"/>
  </svg>)