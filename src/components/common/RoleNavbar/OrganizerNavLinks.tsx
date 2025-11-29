// components/Layout/Navbars/OrganizerNavLinks.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, DollarSign } from 'lucide-react';

interface OrganizerNavLinksProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  isMobile?: boolean;
}

const OrganizerNavLinks: React.FC<OrganizerNavLinksProps> = ({ isMobile = false }) => {
  const location = useLocation();

  const navLinks = [
    {
      to: '/organizer/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      activePaths: ['/organizer/dashboard'],
    },
    {
      to: '/organizer/attendees',
      label: 'Attendees',
      icon: Users,
      activePaths: ['/organizer/attendees'],
    },
    {
      to: '/organizer/myevents',
      label: 'My Events',
      icon: Calendar,
      activePaths: ['/organizer/myevents'],
    },
    {
      to: '/organizer/financial',
      label: 'Financial',
      icon: DollarSign,
      activePaths: ['/organizer/financial'],
    },
  ];

  const isActive = (paths: string[]) => {
    return paths.some(path => 
      location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path))
    );
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.activePaths);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.activePaths);
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={16} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default OrganizerNavLinks;