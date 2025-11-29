import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserNavLinks from "./RoleNavbar/UserNavLinks";
import OrganizerNavLinks from "./RoleNavbar/OrganizerNavLinks";
import AdminNavLinks from "./RoleNavbar/AdminNavLinks";
import StaffNavLinks from "./RoleNavbar/StaffNavLinks";
import { userAuthenticate } from "../../modules/auth/userAuth";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, role, isAuthenticated } = userAuthenticate();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname && isMobileMenuOpen) {
      const timeoutId = setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
    prevPathnameRef.current = location.pathname;
  }, [location.pathname, isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Get role-based brand color
  const getBrandColor = () => {
    if (!isAuthenticated) return "text-blue-600 hover:text-blue-700";
    switch (role) {
      case "ADMIN":
        return "text-indigo-600 hover:text-indigo-700";
      case "ORGANIZER":
        return "text-green-600 hover:text-green-700";
      case "STAFF":
        return "text-purple-600 hover:text-purple-700";
      default:
        return "text-blue-600 hover:text-blue-700";
    }
  };

  // Get role-based home route
  const getHomeRoute = () => {
    if (!isAuthenticated) return "/";
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "ORGANIZER":
        return "/organizer/dashboard";
      case "STAFF":
        return "/staff/dashboard";
      case "USER":
        return "/events";
      default:
        return "/";
    }
  };

  // Return null if user is not authenticated (no navbar shown)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated Navbar
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link
            to={getHomeRoute()}
            className={`text-2xl font-bold ${getBrandColor()} transition-colors flex items-center space-x-2`}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EventLite
            </span>
            {role && (
              <span className="hidden sm:inline-block text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-md capitalize">
                {role.toLowerCase()}
              </span>
            )}
          </Link>

          {/* Desktop Navigation - Role-based Links */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {role === "USER" && (
              <UserNavLinks
                userName={user?.name}
                userEmail={user?.email}
                onLogout={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }}
              />
            )}
            {role === "ORGANIZER" && (
              <OrganizerNavLinks
                userName={user?.name}
                userEmail={user?.email}
                onLogout={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }}
              />
            )}
            {role === "ADMIN" && (
              <AdminNavLinks
                userName={user?.name}
                userEmail={user?.email}
                onLogout={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }}
              />
            )}
            {role === "STAFF" && (
              <StaffNavLinks
                userName={user?.name}
                userEmail={user?.email}
                onLogout={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }}
              />
            )}
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden lg:flex items-center">
            <UserMenu
              user={
                user
                  ? {
                      name: user.name ?? "",
                      email: user.email ?? "",
                    }
                  : { name: "", email: "" }
              }
              role={role ?? ""}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Role-based Navigation Links */}
              <div className="flex flex-col space-y-2">
                {role === "USER" && (
                  <UserNavLinks
                    userName={user?.name}
                    userEmail={user?.email}
                    onLogout={() => {
                      localStorage.removeItem("accessToken");
                      navigate("/");
                    }}
                    isMobile={true}
                  />
                )}
                {role === "ORGANIZER" && (
                  <OrganizerNavLinks
                    userName={user?.name}
                    userEmail={user?.email}
                    onLogout={() => {
                      localStorage.removeItem("accessToken");
                      navigate("/");
                    }}
                    isMobile={true}
                  />
                )}
                {role === "ADMIN" && (
                  <AdminNavLinks
                    userName={user?.name}
                    userEmail={user?.email}
                    onLogout={() => {
                      localStorage.removeItem("accessToken");
                      navigate("/");
                    }}
                    isMobile={true}
                  />
                )}
                {role === "STAFF" && (
                  <StaffNavLinks
                    userName={user?.name}
                    userEmail={user?.email}
                    onLogout={() => {
                      localStorage.removeItem("accessToken");
                      navigate("/");
                    }}
                    isMobile={true}
                  />
                )}
              </div>

              {/* User Menu - Mobile */}
              <div className="pt-4 border-t border-gray-200">
                <UserMenu
                  user={
                    user
                      ? {
                          name: user.name ?? "",
                          email: user.email ?? "",
                        }
                      : { name: "", email: "" }
                  }
                  role={role ?? ""}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
