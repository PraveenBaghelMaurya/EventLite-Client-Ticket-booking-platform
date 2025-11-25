import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  Eye,
  ArrowRight,
  Ticket,
  Search,
  Filter,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../utils/hools";
import { filterEvents } from "../services/api/event";
import type { User } from "../services/types/user";
import type { Event as ApiEvent } from "../services/types/event";
import { toast } from "react-hot-toast";
import type{DisplayEvent, EventCardProps, EventCarouselProps} from '../services/types/event'
import type{EventFilterParams} from '../services/types/event'

const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = "default",
  onBook,
}) => {
  const isTrending = variant === "trending";

  const handleBookTicket = () => {
    onBook(event.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {event.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black bg-opacity-60 px-3 py-1 rounded-full backdrop-blur-sm">
          <Eye size={14} className="text-white" />
          <span className="text-white text-sm">{event.views}</span>
        </div>
        {isTrending && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-linear-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full">
            <TrendingUp size={14} className="text-white" />
            <span className="text-white text-sm font-medium">Trending</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-3 shrink-0" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString()} • {event.time}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-3 shrink-0" />
            <span className="text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-3 shrink-0" />
            <span className="text-sm">
              {event.availableTickets} / {event.capacity} available
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-8 h-8 rounded-full mr-3 border-2 border-gray-200"
            />
            <span className="text-sm text-gray-600 font-medium">
              {event.organizer.name}
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-600">${event.price}</div>
        </div>

        <button
          onClick={handleBookTicket}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-lg"
        >
          <Ticket size={20} className="mr-2" />
          Book Tickets
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const EventCarousel: React.FC<EventCarouselProps> = ({
  events,
  loading,
  currentIndex,
  onSelectIndex,
}) => {
  if (loading) {
    return (
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Featured Events</h2>
        </div>
        <div className="h-96 rounded-3xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading featured events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Featured Events</h2>
        </div>
        <div className="h-96 rounded-3xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">No featured events available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Featured Events</h2>
        <div className="flex items-center space-x-3">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelectIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={events[currentIndex]?.imageUrl}
            alt={events[currentIndex]?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-4xl font-bold mb-3">
              {events[currentIndex]?.title}
            </h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl leading-relaxed">
              {events[currentIndex]?.description}
            </p>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-600 px-4 py-2 rounded-full font-semibold">
                {events[currentIndex]?.category}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                {events[currentIndex]?.date
                  ? new Date(events[currentIndex].date).toLocaleDateString()
                  : ""}
              </span>
              <span className="text-2xl font-bold text-green-400">
                ${events[currentIndex]?.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const FALLBACK_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500";


const Event: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user: storedUser } = useAppSelector((state) => state.signIn);
  const {
    events: storedEvents,
    loading: storedLoading,
    error: storedError,
  } = useAppSelector((state) => state.event);

  const resolvedUser = useMemo<User>(() => {
    if (storedUser) {
      const apiUser = storedUser as any;

      return {
        id: apiUser.data.id?.toString() || "",
        name: apiUser.data.name || "",
        email: apiUser.data.email || "",
        phone: apiUser.data.phone || "",
        role: apiUser.data.role || "USER",
        createdAt: apiUser.data.createdAt || "",
        updatedAt: apiUser.data.updatedAt || "",
        isLoggedIn: apiUser.data.isLoggedIn ?? true,
        avatar: apiUser.avatar || "",
      };
    }
    return {
      id: "",
      name: "Guest User",
      email: "",
      phone: "",
      role: "USER",
      createdAt: "",
      updatedAt: "",
      isLoggedIn: false,
      avatar: "",
    };
  }, [storedUser]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // ✅ Categories API response ke according
  const categories = [
    "all",
    "Entertainment & Arts",
    "Business & Professional",
    "Educational",
    "Food & Drink",
    "Sports & Fitness",
    " Community & Cultural",
    "Technology",
    "Shopping & Fashion",
    "Creative & Hobbies",
    "Family & Kids"
  ];

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await dispatch(filterEvents({})).unwrap();
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, [dispatch]);

  const formatEventForDisplay = (apiEvent: ApiEvent): DisplayEvent => {
    const eventStartDate =
      apiEvent.startDate || apiEvent.date || new Date().toISOString();
    const parsedDate = new Date(eventStartDate);
    const safeDate = Number.isNaN(parsedDate.getTime())
      ? new Date()
      : parsedDate;
    const ticketsCount = apiEvent._count?.tickets ?? 0;
    const bookingsCount = apiEvent._count?.bookings ?? 0;
    const organizerName = apiEvent.organizer?.name || "Organizer";
    const categoryName =
      typeof apiEvent.category === "string"
        ? apiEvent.category
        : apiEvent.category?.name || "General";

    return {
      id: apiEvent.id?.toString() || "unknown-event",
      title: apiEvent.title,
      description: apiEvent.description,
      date: safeDate.toISOString().split("T")[0],
      time:
        apiEvent.time ||
        apiEvent.doorTime ||
        safeDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      venue: apiEvent.venue,
      price: apiEvent.price ?? 0,
      capacity: apiEvent.capacity ?? apiEvent.availableTickets ?? 0,
      availableTickets: apiEvent.availableTickets ?? apiEvent.capacity ?? 0,
      category: categoryName,
      imageUrl: apiEvent.imageUrl || apiEvent.image || FALLBACK_EVENT_IMAGE,
      views: apiEvent.views ?? bookingsCount + ticketsCount,
      organizer: {
        name: organizerName,
        avatar:
          apiEvent.organizer?.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            organizerName
          )}&background=random`,
      },
    };
  };

  const formattedEvents = storedEvents.map((event: ApiEvent) =>
    formatEventForDisplay(event)
  );

  const featuredEvents = formattedEvents
    .filter((event) => new Date(event.date) > new Date())
    .slice(0, 3);

  const upcomingEvents = formattedEvents.filter(
    (event) => new Date(event.date) > new Date()
  );

  const trendingEvents = [...formattedEvents]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  useEffect(() => {
    if (featuredEvents.length > 0) {
      const timer = setInterval(() => {
        setCurrentCarouselIndex((prev) => (prev + 1) % featuredEvents.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [featuredEvents.length]);

  const filteredEvents = formattedEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const applyFilters = async () => {
      const filters: EventFilterParams = {
        page: 1,
        limit: 12,
      };

      if (searchTerm) {
        filters.searchQuery = searchTerm;
      }

      if (activeCategory !== "all") {
        filters.categoryType = activeCategory;
      }

      try {
        await dispatch(filterEvents(filters)).unwrap();
      } catch (error) {
        console.error("Failed to filter events:", error);
        toast.error("Failed to filter events");
      }
    };

    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, activeCategory, dispatch]);

  if (storedLoading && formattedEvents.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (storedError && formattedEvents.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Events
          </h2>
          <p className="text-gray-600 mb-4">{storedError}</p>
          <button
            onClick={() => dispatch(filterEvents({}))}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  const handleBookTicket = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const safeCarouselIndex =
    featuredEvents.length > 0
      ? Math.min(currentCarouselIndex, featuredEvents.length - 1)
      : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Ticket size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">EventLite</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                Welcome, {resolvedUser.name}
              </span>
              <img
                src={
                  resolvedUser.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    resolvedUser.name
                  )}&background=random`
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-600"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Carousel */}
        <EventCarousel
          events={featuredEvents}
          loading={storedLoading}
          currentIndex={safeCarouselIndex}
          onSelectIndex={setCurrentCarouselIndex}
        />

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl w-full">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center space-x-2 ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200"
                  }`}
                >
                  {activeCategory === category && <Filter size={16} />}
                  <span>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event Sections */}
        <div className="space-y-16">
          {/* Show actual events from API */}
          {filteredEvents.length > 0 ? (
            <>
              {/* Trending Events */}
              {trendingEvents.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <TrendingUp size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                          Trending Now
                        </h2>
                        <p className="text-gray-600">Most popular events</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {trendingEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        variant="trending"
                        onBook={handleBookTicket}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming Events */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Calendar size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Upcoming Events
                      </h2>
                      <p className="text-gray-600">
                        Don't miss these exciting events
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onBook={handleBookTicket}
                    />
                  ))}
                </div>
              </section>

              {/* All Events */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Eye size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        All Events
                      </h2>
                      <p className="text-gray-600">
                        Showing {filteredEvents.length} events
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onBook={handleBookTicket}
                    />
                  ))}
                </div>
              </section>
            </>
          ) : (
            // No events found
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-600">
                {searchTerm || activeCategory !== "all"
                  ? "Try changing your search criteria"
                  : "No events available at the moment"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Event;
