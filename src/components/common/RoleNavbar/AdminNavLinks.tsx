import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, DollarSign } from 'lucide-react';

interface AdminNavLinksProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  isMobile?: boolean;
}

const AdminNavLinks: React.FC<AdminNavLinksProps> = ({ isMobile = false }) => {
  const location = useLocation();

  const navLinks = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      activePaths: ['/admin/dashboard'],
    },
    {
      to: '/admin/users',
      label: 'Users',
      icon: Users,
      activePaths: ['/admin/users'],
    },
    {
      to: '/admin/events',
      label: 'Events',
      icon: Calendar,
      activePaths: ['/admin/events'],
    },
    {
      to: '/admin/platform',
      label: 'Platform',
      icon: Settings,
      activePaths: ['/admin/platform'],
    },
    {
      to: '/admin/financial',
      label: 'Financial',
      icon: DollarSign,
      activePaths: ['/admin/financial'],
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
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
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
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
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

export default AdminNavLinks;