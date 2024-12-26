import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Calendar className="h-16 w-16 text-blue-500" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find and Book Amazing Events
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300">
            Discover concerts, workshops, conferences, and more. Book your tickets securely and manage all your events in one place.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/events">
              <Button size="lg" className="font-semibold">
                Browse Events
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button size="lg" variant="outline" className="font-semibold text-white hover:bg-white hover:text-gray-900">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}