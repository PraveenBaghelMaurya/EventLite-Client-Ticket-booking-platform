// components/Layout/Navbars/UserNavLinks.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Ticket, FileText } from 'lucide-react';

interface UserNavLinksProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  isMobile?: boolean;
}

const UserNavLinks: React.FC<UserNavLinksProps> = ({ isMobile = false }) => {
  const location = useLocation();

  const navLinks = [
    {
      to: '/events',
      label: 'Events',
      icon: Calendar,
      activePaths: ['/events', '/'],
    },
    {
      to: '/my-tickets',
      label: 'My Tickets',
      icon: Ticket,
      activePaths: ['/my-tickets'],
    },
    {
      to: '/policy',
      label: 'Policy',
      icon: FileText,
      activePaths: ['/policy'],
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
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
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
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
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

export default UserNavLinks;