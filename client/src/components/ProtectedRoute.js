import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigateToLogin = useNavigate();
  const validateToken = async () => {
    try {
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLoading(false);
      } else {
        setLoading(false);
        navigateToLogin("/login");
      }
    } catch (error) {
      setLoading(false);
      navigateToLogin("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigateToLogin("/login");
    }
  }, []);
  return <div>{loading ? <div>Loading...</div> : <div>{children}</div>}</div>;
}

export default ProtectedRoute;
