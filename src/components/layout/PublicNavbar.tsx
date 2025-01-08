import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 
              onClick={() => navigate('/')} 
              className="text-xl font-semibold cursor-pointer"
            >
              maxwell
            </h1>
            <div className="hidden md:flex ml-10 space-x-8">
              <NavLink to="/about">About</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
    >
      {children}
    </button>
  );
}