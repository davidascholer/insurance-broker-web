import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hook to check if user is authenticated via pipaAdminAccessToken
 * Redirects to /admin if token is not found
 */
export const useRequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("pipaAdminAccessToken");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);
};
