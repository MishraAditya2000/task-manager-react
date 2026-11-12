export const ROUTES = {
  HOME: '/',
  TASKS: '/tasks',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Tasks', to: ROUTES.TASKS },
] as const;