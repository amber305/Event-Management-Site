import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Ticket } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';
import type { Event } from '@/types';

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        navigate('/events');
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please sign in to book tickets');
      navigate('/sign-in');
      return;
    }

    if (!event) return;

    try {
      const totalPrice = event.price * ticketQuantity;

      const { error } = await supabase.from('bookings').insert([
        {
          event_id: event.id,
          user_id: user.id,
          quantity: ticketQuantity,
          total_price: totalPrice,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      toast.success('Booking created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-lg">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-lg">Event not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <img
            src={event.image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                {event.category}
              </span>
              <span className="text-sm text-gray-500">
                {event.available_tickets} tickets left
              </span>
            </div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
          </div>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{formatTime(event.time)}</span>
            </div>
          </div>

          <p className="text-gray-600">{event.description}</p>

          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Price per ticket</span>
              <span className="text-2xl font-bold">{formatPrice(event.price)}</span>
            </div>

            <div className="flex items-center gap-4">
              <Users className="h-5 w-5 text-gray-500" />
              <select
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(Number(e.target.value))}
                className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold">
                {formatPrice(event.price * ticketQuantity)}
              </span>
            </div>

            <Button
              onClick={handleBooking}
              className="w-full gap-2"
              size="lg"
            >
              <Ticket className="h-5 w-5" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}