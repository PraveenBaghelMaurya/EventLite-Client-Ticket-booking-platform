export interface EventCategory {
  id?: number;
  name: string;
  description?: string;
  slug?: string;
  image?: string;
}

export interface EventOrganizer {
  id?: number | string;
  name: string;
  email?: string;
  avatar?: string;
  rating?: number;
  totalEvents?: number;
}

export interface EventCounts {
  tickets?: number;
  bookings?: number;
}

export interface Event {
  id: number | string;
  title: string;
  description: string;
  shortDescription?: string;
  longDescription?: string;
  venue: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  date?: string;
  time?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  doorTime?: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
  price: number;
  capacity: number;
  availableTickets: number;
  status?: string;
  isFeatured?: boolean;
  isPublic?: boolean;
  views?: number;
  rating?: number;
  totalReviews?: number;
  category?: EventCategory | string;
  organizer?: EventOrganizer;
  tags?: string[];
  requirements?: string[];
  includes?: string[];
  _count?: EventCounts;
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

export interface DisplayEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  capacity: number;
  availableTickets: number;
  category: string;
  imageUrl: string;
  views: number;
  organizer: {
    name: string;
    avatar: string;
  };
}

export interface EventCardProps {
  event: DisplayEvent;
  variant?: "default" | "trending";
  onBook: (eventId: string) => void;
}

export interface EventCarouselProps {
  events: DisplayEvent[];
  loading: boolean;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export type EventFilterParams = {
  page: number;
  limit: number;
  searchQuery?: string;
  categoryType?: string;
  timeRange?: string;
  sortBy?: string;
  sortOrder?: string;
}; 