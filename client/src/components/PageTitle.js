import React from "react";

// Functional component for rendering a page title
function PageTitle({ title }) {
  // Render the page title
  return (
    <div>
      <h1 className="text-xl">{title}</h1>
    </div>
  );
}

// Export the PageTitle component
export default PageTitle;

// Comments:
// - This is a simple functional component that receives a 'title' prop.
// - It renders an <h1> HTML element with the provided title and applies a CSS class 'text-xl' for styling.
// - The component is meant to be reused across different pages to display their titles.
