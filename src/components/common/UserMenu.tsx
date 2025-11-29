import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  role?: string;
  isMobile?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  role,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  // Close menu when route changes
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      // FIX: Make it asynchronous
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 0);

      prevPathnameRef.current = location.pathname;

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".user-menu-container")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    setIsOpen(false);
  };

  // Safe function to get initials with null checks
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role-based color
  const getRoleColor = () => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "bg-indigo-500";
      case "ORGANIZER":
        return "bg-green-500";
      case "STAFF":
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  };

  // Get role-based text color
  const getRoleTextColor = () => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "text-indigo-600";
      case "ORGANIZER":
        return "text-green-600";
      case "STAFF":
        return "text-purple-600";
      default:
        return "text-blue-600";
    }
  };

  // Safe values for user data
  const safeUserName = user?.name || "User";
  const safeUserEmail = user?.email || "No email provided";
  const safeRole = role || "User";

  // Get profile route based on role
  const getProfileRoute = () => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "/admin/profile";
      case "ORGANIZER":
        return "/organizer/profile";
      case "STAFF":
        return "/staff/profile";
      default:
        return "/profile";
    }
  };

  // Get settings route based on role
  const getSettingsRoute = () => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "/admin/settings";
      case "ORGANIZER":
        return "/organizer/settings";
      case "STAFF":
        return "/staff/settings";
      default:
        return "/settings";
    }
  };

  if (isMobile) {
    return (
      <div className="user-menu-container w-full">
        <div className="flex flex-col space-y-2">
          {/* User Info Card */}
          <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 ${getRoleColor()} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm`}
              >
                {getInitials(safeUserName)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {safeUserName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {safeUserEmail}
                </p>
                <p
                  className={`text-xs font-medium mt-1 capitalize ${getRoleTextColor()}`}
                >
                  {safeRole.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                navigate(getProfileRoute());
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <User size={18} />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                navigate(getSettingsRoute());
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>

            <button
              onClick={() => {
                navigate("/help");
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-menu-container relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-full pl-3 pr-2 py-1.5 transition-all border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {safeUserName.split(" ")[0]}
        </span>
        <div
          className={`w-8 h-8 ${getRoleColor()} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm`}
        >
          {getInitials(safeUserName)}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {safeUserName}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {safeUserEmail}
              </p>
              <p
                className={`text-xs font-medium mt-1.5 capitalize ${getRoleTextColor()}`}
              >
                {safeRole.toLowerCase()}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  navigate(getProfileRoute());
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <User size={18} className="text-gray-400" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  navigate(getSettingsRoute());
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <Settings size={18} className="text-gray-400" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  navigate("/help");
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <HelpCircle size={18} className="text-gray-400" />
                <span>Help & Support</span>
              </button>
            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={18} className="text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Overlay to close when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default UserMenu;
