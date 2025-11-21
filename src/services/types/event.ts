export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  endTime: string;
  venue: string;
  address: string;
  price: number;
  capacity: number;
  availableTickets: number;
  category: string;
  imageUrl: string;
  views: number;
  rating: number;
  totalReviews: number;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    rating: number;
    totalEvents: number;
  };
  tags: string[];
  requirements?: string[];
  includes?: string[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  available: number;
  description: string;
}

export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}