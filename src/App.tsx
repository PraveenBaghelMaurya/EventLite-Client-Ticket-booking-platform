import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signup";
import Event from "../src/pages/user/Event";
import EventDetail from "../src/pages/user/EventDetail";
import AdminRoute from "./components/protectedRoute/AdminRoute";
import UserRoute from "./components/protectedRoute/UserRoute";
import StaffRoute from "./components/protectedRoute/StaffRoute";
import OraganizerRoute from "./components/protectedRoute/OrganizerRoute";
import StaffDashboard from "./pages/staff/StaffDashboard";
import OrganizerDashboard from './pages/organizer/OrganizerDashboard'
import AdminDashboard from "./pages/admin/AdminDashboard";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    // FIX: Move Navbar and layout wrapper outside Routes
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* User routes */}
        <Route element={<UserRoute />}>
          <Route path="/events" element={<Event />} />
          <Route path="/eventsDetails" element={<EventDetail />} />
        </Route>

        {/* Staff routes */}
        <Route element={<StaffRoute />}>
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
        </Route>

        {/* Organizer routes */}
        <Route element={<OraganizerRoute />}>
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;