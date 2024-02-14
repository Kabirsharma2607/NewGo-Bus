import React from "react";
import { Row, Col } from "antd";
import "../resources/bus.css";

function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {
  // Extract the capacity of the bus from the provided bus object
  const capacity = bus.capacity;

  // Function to handle selecting or unselecting seats based on the seat number
  const selectOrUnselectSeats = (seatNumber) => {
    // Check if the seat is already selected
    if (selectedSeats.includes(seatNumber)) {
      // If selected, remove it from the selected seats
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // If not selected, add it to the selected seats
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="mx-5">
      {/* Container for displaying the bus layout */}
      <div className="bus-container">
        {/* Display rows and columns of seats */}
        <Row gutter={[10, 10]}>
          {/* Generate seats based on the capacity of the bus */}
          {Array.from(Array(capacity).keys()).map((seat) => {
            // Determine the CSS class for the current seat based on its state
            let seatClass = "";
            if (selectedSeats.includes(seat + 1)) {
              // If the seat is selected, apply the "selected-seat" class
              seatClass = "selected-seat";
            } else if (bus.seatsBooked.includes(seat + 1)) {
              // If the seat is booked, apply the "booked-seat" class
              seatClass = "booked-seat";
            }
            // Render each seat as a clickable div with its seat number
            return (
              <Col span={6} key={seat + 1}>
                <div
                  className={`seat ${seatClass}`}
                  onClick={() => selectOrUnselectSeats(seat + 1)}
                >
                  {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SeatSelection;

// Comments:
// - This component represents the seat selection interface for a bus.
// - It receives information about selected seats, available seats, and the bus layout.
// - Users can click on seats to select or unselect them.
// - Seats are visually differentiated based on their selection state and booking status.
// - The component uses Ant Design's Row and Col for layout and styling.
