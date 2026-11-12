import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../constants/routes';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`;

const Navbar = () => (
  <header className="sticky top-0 z-10 border-b bg-white">
    <nav className="container mx-auto flex h-14 items-center justify-between px-4">
      <NavLink to={ROUTES.HOME} className="text-lg font-bold">
        {/* Task Manager */}
      </NavLink>
      {/* <ul className="flex gap-2">
        {NAV_ITEMS.map(({ label, to }) => (
          <li key={to}>
            <NavLink to={to} end={to === ROUTES.HOME} className={linkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul> */}
    </nav>
  </header>
);

export default Navbar;