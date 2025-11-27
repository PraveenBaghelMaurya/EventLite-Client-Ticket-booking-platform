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


const App = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* admin route */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>


      {/* user route */}
      <Route element={<UserRoute/>}>
      <Route path="/events" element={<Event/>}/>
      <Route path="/eventsDetails" element={<EventDetail/>}/>    
      </Route>


      {/* staff route */}
      <Route element={<StaffRoute/>}>
      <Route path="/staff/dashboard" element={<StaffDashboard/>}/>
      </Route>


      {/* organizer route */}
      <Route element={<OraganizerRoute/>}>
      <Route path="/organizer/dashboard" element={<OrganizerDashboard/>}/>
      </Route>

    </Routes>
  );
};
export default App;
