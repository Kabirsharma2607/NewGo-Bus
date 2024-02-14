import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  // Access the navigation function from the React Router DOM
  const navigation = useNavigate();

  // useEffect to check if a token is present in localStorage
  useEffect(() => {
    // If a token is found, redirect the user to the home page ("/")
    if (localStorage.getItem("token")) {
      navigation("/");
    }
  });

  // Render the children components within a div
  return <div>{children}</div>;
}

// Export the PublicRoute component
export default PublicRoute;

// Comments:
// - This component is a wrapper for routes that should only be accessible to non-authenticated users.
// - It utilizes the useEffect hook to check for the presence of a token in localStorage.
// - If a token is found, it redirects the user to the home page ("/").
// - The navigation function from React Router DOM is used for redirection.
// - The children components (route content) are rendered within a div.
