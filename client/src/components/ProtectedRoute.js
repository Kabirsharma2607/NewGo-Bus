import { message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  // Access the dispatch function from the React Redux store
  const dispatch = useDispatch();

  // Access user information from the Redux store
  const { user } = useSelector((state) => state.users);

  // Access the navigate function from the React Router DOM
  const navigateToLogin = useNavigate();

  // Function to validate the user's token
  const validateToken = async () => {
    try {
      // Show loading spinner
      dispatch(ShowLoading());

      // Make a request to the server to validate the token
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Hide loading spinner
      dispatch(HideLoading());

      // If the token is valid, set the user in the Redux store
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        // If the token is not valid, remove it from localStorage, show an error message,
        // and redirect the user to the login page
        localStorage.removeItem("token");
        navigateToLogin("/login");
      }
    } catch (error) {
      // Handle errors by removing the token, showing an error message, hiding the loading spinner,
      // and redirecting the user to the login page
      localStorage.removeItem("token");
      message.error(error.message);
      dispatch(HideLoading());
      navigateToLogin("/login");
    }
  };

  // useEffect to check if a token is present in localStorage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // If a token is found, validate it
      validateToken();
    } else {
      // If no token is found, redirect the user to the login page
      navigateToLogin("/login");
    }
  }, []);

  // Render the children components within DefaultLayout if the user is authenticated
  return (
    <div>{user !== null && <DefaultLayout>{children}</DefaultLayout>}</div>
  );
}

// Export the ProtectedRoute component
export default ProtectedRoute;

// Comments:
// - This component is a wrapper for routes that should only be accessible to authenticated users.
// - It uses the Redux store to check if the user is authenticated.
// - The useEffect hook checks for the presence of a token in localStorage.
// - If a token is found, it validates the token by making a request to the server.
// - If the token is valid, it sets the user in the Redux store and renders the children components within DefaultLayout.
// - If the token is not valid or an error occurs, it removes the token, shows an error message, and redirects the user to the login page.
// - If no token is found, it redirects the user to the login page.
