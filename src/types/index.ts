export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  category: string;
  image_url: string;
  available_tickets: number;
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'user' | 'admin';
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  payment_intent_id?: string;
}