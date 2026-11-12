import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../constants/routes';

const BottomNav = () => (
  <footer className="sticky bottom-0 z-10 border-t bg-white">
    <nav className="container mx-auto flex h-14 items-center justify-around px-4">
      {NAV_ITEMS.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === ROUTES.HOME}
          className={({ isActive }) =>
            `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </footer>
);

export default BottomNav;