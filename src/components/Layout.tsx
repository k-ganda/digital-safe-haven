import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream text-dark-gray font-sans">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}