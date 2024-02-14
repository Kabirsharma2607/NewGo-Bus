import React from "react";
import { useNavigate } from "react-router-dom";

// Bus component to display bus details
function Bus({ bus }) {
  const navigate = useNavigate();

  // Render bus information in a card layout
  return (
    <div className="card p-2">
      {/* Bus name */}
      <h1 className="text-lg primary-text">{bus.name}</h1>
      <hr />

      {/* Bus details */}
      <div className="d-flex justify-content-between">
        <div>
          {/* From */}
          <p className="text-lg">From</p>
          <p className="text-sm">{bus.from}</p>
        </div>

        <div>
          {/* To */}
          <p className="text-lg">To</p>
          <p className="text-sm">{bus.to}</p>
        </div>

        <div>
          {/* Fare */}
          <p className="text-lg">Fare</p>
          <p className="text-sm"> ₹{bus.fare} /-</p>
        </div>
      </div>
      <hr />

      {/* Journey information and Book Now button */}
      <div className="d-flex justify-content-between align-items-end">
        <div>
          {/* Journey Date */}
          <p className="text-lg">Journey Date</p>
          <p className="text-sm">{bus.journeyDate}</p>
        </div>

        {/* Book Now button */}
        <h1
          className="text-lg underline secondary-text"
          onClick={() => {
            navigate(`/book-now/${bus._id}`);
          }}
        >
          Book Now
        </h1>
      </div>
    </div>
  );
}

// Export the Bus component
export default Bus;

// Comments:
// - This component displays bus details in a card layout.
// - It includes information such as bus name, origin (From), destination (To), fare, and journey date.
// - The "Book Now" button is provided with a link to navigate to the booking page for the specific bus.
// - The component is designed for reusability in displaying information about different buses.
