import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';
import type { Event } from '@/types';

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchEvents() {
      try {
        let query = supabase.from('events').select('*');

        if (searchQuery) {
          query = query.ilike('title', `%${searchQuery}%`);
        }

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;
        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="conference">Conferences</option>
              <option value="workshop">Workshops</option>
              <option value="concert">Concerts</option>
              <option value="exhibition">Exhibitions</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">Loading events...</div>
        </div>
      ) : events.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600">No events found</p>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={event.image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                    {event.category}
                  </span>
                  <span className="font-medium text-gray-900">{formatPrice(event.price)}</span>
                </div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(event.date)}</span>
                  <span>{formatTime(event.time)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}