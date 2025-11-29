import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { tokenPayload } from "../../services/types/user";


const OraganizerRoute = () => {
  const [isORGANIZER, setIsORGANIZER] = useState(false);
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

      if (decoded.role === "ORGANIZER") {
        setIsORGANIZER(true);
      } else {
        toast.error("ONLY ORGANIZER is AUTHORIZED");
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

  if (!isORGANIZER) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OraganizerRoute;
