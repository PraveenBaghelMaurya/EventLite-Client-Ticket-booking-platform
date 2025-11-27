import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { tokenPayload } from "../../services/types/user";

// Changes: STAFFRoute now guards nested Event/EventDetail routes via <Outlet />.
const StaffRoute = () => {
  const [isSTAFF, setIsSTAFF] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      toast.error("Authentication required");
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<tokenPayload>(token);

      if (decoded.role === "STAFF") {
        setIsSTAFF(true);
      } else {
        toast.error("ONLY STAFF is AUTHORIZED");
      }
    } catch {
      toast.error("Invalid token");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSTAFF) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default StaffRoute;
