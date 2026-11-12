import { Outlet } from 'react-router-dom';
import Navbar from '../Nav/Navbar';
import BottomNav from '../Nav/BottomNav';

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="container mx-auto flex-1 px-4 py-6">
      <Outlet />
    </main>
    {/* <BottomNav /> */}
  </div>
);

export default Layout;