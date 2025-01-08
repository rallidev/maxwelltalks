import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export function Navbar() {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-xl font-semibold">maxwell</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.full_name || user?.email}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={signOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}