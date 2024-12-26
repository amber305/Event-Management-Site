import { Link } from 'react-router-dom';
import { Calendar, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">EventHub</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/events" className="text-gray-600 hover:text-gray-900">
            Events
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}