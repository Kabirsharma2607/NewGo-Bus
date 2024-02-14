import React from "react";
import "../resources/global.css";

// Functional component for displaying a loading spinner
function Loader() {
  // Render a spinner using Bootstrap's 'spinner-border' class
  return (
    <div className="spinner-parent">
      <div className="spinner-border" role="status"></div>
    </div>
  );
}

// Export the Loader component
export default Loader;

// Comments:
// - This component displays a loading spinner.
// - It uses Bootstrap's 'spinner-border' class for the spinner appearance.
// - The 'spinner-parent' class may be used for styling purposes.
// - This component is likely used to indicate that a process is ongoing in the application.
