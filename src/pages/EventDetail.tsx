import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Share2, Heart, ArrowLeft, Ticket, Star, Eye } from 'lucide-react';

// Types
import type { Event } from '../services/types/event';
import type { TicketType } from '../services/types/event';
import type { Review } from '../services/types/event';

// Mock data - Replace with actual API call to /api/events/:id
const mockEvent: Event = {
  id: '1',
  title: 'Tech Conference 2024',
  description: 'Annual technology conference featuring latest innovations',
  longDescription: `Join us for the most anticipated technology conference of the year! Tech Conference 2024 brings together industry leaders, innovators, and enthusiasts to explore the latest trends in artificial intelligence, blockchain, cloud computing, and more.

This year's conference features:
• Keynote speeches from industry pioneers
• Hands-on workshops and technical sessions
• Networking opportunities with professionals
• Startup pitch competitions
• Latest tech product demonstrations

Whether you're a developer, entrepreneur, or tech enthusiast, this conference offers valuable insights and connections to propel your career forward. Don't miss this opportunity to learn from the best and connect with like-minded individuals in the tech community.`,
  date: '2024-03-15',
  time: '09:00',
  endTime: '18:00',
  venue: 'Convention Center',
  address: '123 Tech Street, Innovation District, Tech City 10101',
  price: 99,
  capacity: 500,
  availableTickets: 350,
  category: 'Technology',
  imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  views: 1250,
  rating: 4.8,
  totalReviews: 127,
  organizer: {
    id: 'org1',
    name: 'Tech Events Inc',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    email: 'contact@techevents.com',
    rating: 4.9,
    totalEvents: 47
  },
  tags: ['AI', 'Blockchain', 'Cloud Computing', 'Startups', 'Networking'],
  requirements: [
    'Laptop for workshops',
    'Business cards for networking',
    'Government ID for registration'
  ],
  includes: [
    'Conference access all day',
    'Lunch and refreshments',
    'Conference swag bag',
    'Digital certificate of participation',
    'Access to conference app'
  ]
};

const mockTickets: TicketType[] = [
  {
    id: '1',
    name: 'General Admission',
    price: 99,
    quantity: 1,
    available: 250,
    description: 'Full access to all conference sessions and exhibition area'
  },
  {
    id: '2',
    name: 'VIP Pass',
    price: 199,
    quantity: 1,
    available: 80,
    description: 'Includes premium seating, VIP lounge access, and networking dinner'
  },
  {
    id: '3',
    name: 'Student Pass',
    price: 49,
    quantity: 1,
    available: 20,
    description: 'Special pricing for students with valid student ID'
  }
];

const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    rating: 5,
    comment: 'Amazing conference! The speakers were incredible and the networking opportunities were priceless. Will definitely attend next year.',
    date: '2024-01-15'
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    rating: 4,
    comment: 'Great content and organization. The workshops were particularly helpful. Looking forward to the next one!',
    date: '2024-01-10'
  },
  {
    id: '3',
    user: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    rating: 5,
    comment: 'One of the best tech conferences I have attended. The AI sessions were mind-blowing!',
    date: '2024-01-08'
  }
];

// Icon components (if not using lucide-react)
const CalendarIcon = Calendar;
const MapPinIcon = MapPin;
const UsersIcon = Users;
const ClockIcon = Clock;
const ShareIcon = Share2;
const HeartIcon = Heart;
const ArrowLeftIcon = ArrowLeft;
const TicketIcon = Ticket;
const StarIcon = Star;
const EyeIcon = Eye;

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      // Simulate API call - Replace with actual API call to /api/events/:id
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvent(mockEvent);
      setTickets(mockTickets);
      setReviews(mockReviews);
      
      // Initialize ticket quantities
      const initialQuantities: { [key: string]: number } = {};
      mockTickets.forEach(ticket => {
        initialQuantities[ticket.id] = 1;
      });
      setTicketQuantity(initialQuantities);
      
      setIsLoading(false);
    };

    fetchEventDetails();
  }, [id]);

  const handleBookTickets = () => {
    if (selectedTicket) {
      navigate(`/checkout`, { 
        state: { 
          event,
          ticket: tickets.find(t => t.id === selectedTicket),
          quantity: ticketQuantity[selectedTicket]
        }
      });
    }
  };

  const handleQuantityChange = (ticketId: string, increment: boolean) => {
    setTicketQuantity(prev => {
      const current = prev[ticketId] || 1;
      const ticket = tickets.find(t => t.id === ticketId);
      const newQuantity = increment ? current + 1 : Math.max(1, current - 1);
      
      if (ticket && newQuantity <= ticket.available) {
        return { ...prev, [ticketId]: newQuantity };
      }
      return prev;
    });
  };

  const handleShare = async () => {
    if (navigator.share && event) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = selectedTicket ? 
    (tickets.find(t => t.id === selectedTicket)?.price || 0) * (ticketQuantity[selectedTicket] || 1) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/events')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon size={20} className="mr-2" />
              Back to Events
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Share event"
              >
                <ShareIcon size={20} />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="rounded-2xl overflow-hidden mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Event Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                <div className="flex items-center text-gray-600">
                  <EyeIcon size={16} className="mr-1" />
                  <span className="text-sm">{event.views} views</span>
                </div>
                <div className="flex items-center text-yellow-600">
                  <StarIcon size={16} className="mr-1" fill="currentColor" />
                  <span className="text-sm">{event.rating} ({event.totalReviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <CalendarIcon size={20} className="mr-3 text-blue-600" />
                  <div>
                    <div className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</div>
                    <div className="text-sm text-gray-600">{event.time} - {event.endTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <MapPinIcon size={20} className="mr-3 text-blue-600" />
                  <div>
                    <div className="font-semibold">{event.venue}</div>
                    <div className="text-sm text-gray-600">{event.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <UsersIcon size={20} className="mr-3 text-blue-600" />
                  <div>
                    <div className="font-semibold">{event.availableTickets} tickets left</div>
                    <div className="text-sm text-gray-600">of {event.capacity} total</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="border-b">
                <nav className="flex -mb-px">
                  {['details', 'reviews', 'organizer'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">About This Event</h3>
                      <p className="text-gray-700 whitespace-pre-line">{event.longDescription}</p>
                    </div>

                    {event.includes && event.includes.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3">What's Included</h4>
                        <ul className="space-y-2">
                          {event.includes.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {event.requirements && event.requirements.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {event.requirements.map((req, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="text-5xl font-bold text-yellow-600 mb-2">{event.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            size={20} 
                            className={`${
                              i < Math.floor(event.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill={i < event.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">Based on {event.totalReviews} reviews</p>
                    </div>

                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center mb-3">
                            <img 
                              src={review.user.avatar} 
                              alt={review.user.name}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-semibold">{review.user.name}</div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon 
                                    key={i} 
                                    size={16} 
                                    className={`${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill={i < review.rating ? 'currentColor' : 'none'}
                                  />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'organizer' && (
                  <div className="flex items-center space-x-4">
                    <img 
                      src={event.organizer.avatar} 
                      alt={event.organizer.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{event.organizer.name}</h3>
                      <p className="text-gray-600 mb-2">{event.organizer.email}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <StarIcon size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                          <span>{event.organizer.rating} Rating</span>
                        </div>
                        <div>
                          <span>{event.organizer.totalEvents} Events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm sticky top-24 p-6">
              <h3 className="text-xl font-bold mb-4">Get Tickets</h3>
              
              {/* Ticket Options */}
              <div className="space-y-4 mb-6">
                {tickets.map(ticket => (
                  <div 
                    key={ticket.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTicket === ticket.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{ticket.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${ticket.price}</div>
                        <div className="text-sm text-gray-500">{ticket.available} available</div>
                      </div>
                    </div>
                    
                    {selectedTicket === ticket.id && (
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(ticket.id, false);
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {ticketQuantity[ticket.id] || 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(ticket.id, true);
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          ${(ticket.price * (ticketQuantity[ticket.id] || 1)).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Total Price */}
              {selectedTicket && (
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBookTickets}
                disabled={!selectedTicket}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  selectedTicket
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <TicketIcon size={20} className="inline mr-2" />
                {selectedTicket ? 'Book Now' : 'Select Tickets'}
              </button>

              {/* Quick Info */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <ClockIcon size={16} className="mr-2" />
                  <span>Approx. {event.time} - {event.endTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon size={16} className="mr-2" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon size={16} className="mr-2" />
                  <span>{event.availableTickets} of {event.capacity} tickets remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;