// components/Layout/Navbars/StaffNavLinks.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, Ticket, FileText, MoreHorizontal } from 'lucide-react';

interface StaffNavLinksProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  isMobile?: boolean;
}

const StaffNavLinks: React.FC<StaffNavLinksProps> = ({ isMobile = false }) => {
  const location = useLocation();

  const navLinks = [
    {
      to: '/staff/support',
      label: 'Support',
      icon: Headphones,
      activePaths: ['/staff/support'],
    },
    {
      to: '/staff/tickets',
      label: 'Tickets',
      icon: Ticket,
      activePaths: ['/staff/tickets'],
    },
    {
      to: '/staff/reports',
      label: 'Reports',
      icon: FileText,
      activePaths: ['/staff/reports'],
    },
    {
      to: '/staff/misc',
      label: 'Miscellaneous',
      icon: MoreHorizontal,
      activePaths: ['/staff/misc'],
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
                  ? 'bg-purple-50 text-purple-600 border border-purple-200'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
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
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
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

export default StaffNavLinks;