import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center bg-off-white">
      <Link to="/" className="text-2xl font-bold text-gray-800">Amani Digital</Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/digital-abuse" className="text-gray-600 hover:text-soft-purple transition-colors">What's Up?</Link>
        <Link to="/support-assistant" className="text-gray-600 hover:text-soft-purple transition-colors">Talk To Us</Link>
        <Link to="/locker" className="text-gray-600 hover:text-soft-purple transition-colors">Locker</Link>
        <Link to="/resources" className="text-gray-600 hover:text-soft-purple transition-colors">Emergency Resources</Link>
      </nav>
    </header>
  );
};

export default Header;