import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, Eye, ArrowRight, Ticket } from 'lucide-react';
import { useAppSelector } from '../utils/hools';
import type{User} from '../services/types/user'

// Types

interface Event {
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

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   isLoggedIn: boolean;
// }

// Mock data - Replace with actual API calls
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring latest innovations',
    date: '2024-03-15',
    time: '09:00',
    venue: 'Convention Center',
    price: 99,
    capacity: 500,
    availableTickets: 350,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
    views: 1250,
    organizer: {
      name: 'Tech Events Inc',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    }
  },
  {
    id: '2',
    title: 'Jazz Night Live',
    description: 'An evening of smooth jazz with renowned artists',
    date: '2024-03-20',
    time: '19:30',
    venue: 'City Music Hall',
    price: 45,
    capacity: 200,
    availableTickets: 75,
    category: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
    views: 890,
    organizer: {
      name: 'Music Productions',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    }
  },
  {
    id: '3',
    title: 'Food Festival',
    description: 'Culinary delights from around the world',
    date: '2024-04-05',
    time: '11:00',
    venue: 'Central Park',
    price: 25,
    capacity: 1000,
    availableTickets: 600,
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
    views: 2100,
    organizer: {
      name: 'Food Events Co',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    }
  },
  {
    id: '4',
    title: 'Startup Pitch Competition',
    description: 'Watch promising startups pitch to investors',
    date: '2024-03-25',
    time: '14:00',
    venue: 'Innovation Hub',
    price: 35,
    capacity: 300,
    availableTickets: 150,
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500',
    views: 670,
    organizer: {
      name: 'Startup Community',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    }
  }
];

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.signIn);
  
  const handleBookTicket = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black bg-opacity-50 px-2 py-1 rounded-full">
          <Eye size={16} className="text-white" />
          <span className="text-white text-sm">{event.views}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-2" />
            <span>{event.availableTickets} / {event.capacity} tickets available</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img 
              src={event.organizer.avatar} 
              alt={event.organizer.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{event.organizer.name}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            ${event.price}
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookTicket}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
        >
          <Ticket size={20} className="mr-2" />
          Book Tickets
        </motion.button>
      </div>
    </motion.div>
  );
};

const EventCarousel: React.FC<{ events: Event[]; title: string }> = ({ events, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <div className="flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={events[currentIndex].imageUrl}
              alt={events[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">{events[currentIndex].title}</h3>
              <p className="text-lg mb-4 opacity-90">{events[currentIndex].description}</p>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-600 px-3 py-1 rounded-full">
                  {events[currentIndex].category}
                </span>
                <span>{new Date(events[currentIndex].date).toLocaleDateString()}</span>
                <span>${events[currentIndex].price}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate user authentication check
  useEffect(() => {
    // Replace with actual authentication check
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      isLoggedIn: true
    };
    setUser(mockUser);
  }, []);

  // Filter events based on search and category
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Categorize events
  const latestEvents = mockEvents.slice(0, 3);
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) > new Date());
  const mostViewedEvents = [...mockEvents].sort((a, b) => b.views - a.views).slice(0, 4);

  const categories = ['all', 'Technology', 'Music', 'Food', 'Business'];

  if (!user?.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to EventLite</h1>
          <p className="text-gray-600 mb-6">Please log in to view and book events</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">EventLite</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Carousel */}
        <EventCarousel events={latestEvents} title="Featured Events" />

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Event Sections */}
        <div className="space-y-12">
          {/* Upcoming Events */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                View All <ArrowRight size={20} className="ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Most Viewed Events */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Most Viewed Events</h2>
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                View All <ArrowRight size={20} className="ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mostViewedEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;