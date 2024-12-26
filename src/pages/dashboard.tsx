import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';
import type { Booking, Event } from '@/types';

interface BookingWithEvent extends Booking {
  event: Event;
}

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingWithEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    async function fetchBookings() {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            event:events(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-lg">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
          <Calendar className="mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg text-gray-600">No bookings found</p>
          <Button
            variant="outline"
            onClick={() => navigate('/events')}
            className="mt-4"
          >
            Browse Events
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="overflow-hidden rounded-lg border bg-white shadow-sm"
            >
              <img
                src={booking.event.image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'}
                alt={booking.event.title}
                className="aspect-video w-full object-cover"
              />
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                    {booking.event.category}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold">{booking.event.title}</h3>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(booking.event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(booking.event.time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.event.venue}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {booking.quantity} {booking.quantity === 1 ? 'ticket' : 'tickets'}
                    </p>
                    <p className="text-lg font-semibold">
                      {formatPrice(booking.total_price)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/events/${booking.event.id}`)}
                  >
                    View Event
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}