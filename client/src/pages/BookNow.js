// Import necessary React components, hooks, styles, and libraries
import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

// Functional component for booking a seat on a bus
function BookNow() {
  // Initialize necessary hooks and variables
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);

  // Function to fetch bus details by ID from the server
  const getBus = async () => {
    try {
      // Show loading state during the data fetching process
      dispatch(ShowLoading());

      // Make a POST request to the server to get bus details by ID
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });

      // Hide loading state after data fetching process
      dispatch(HideLoading());

      // Check the server response and update the state with fetched data
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // Hide loading state if an error occurs during data fetching
      dispatch(HideLoading());

      // Display an error message
      message.error(error.message);
    }
  };

  // Function to book selected seats on the bus
  const bookNow = async () => {
    try {
      // Show loading state during the booking process
      dispatch(ShowLoading());

      // Make a POST request to the server to book selected seats
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
      });

      // Hide loading state after the booking process
      dispatch(HideLoading());

      // Check the server response and display appropriate messages
      if (response.data.success) {
        message.success(response.data.message);

        // Redirect to the bookings page after successful booking
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // Hide loading state if an error occurs during the booking process
      dispatch(HideLoading());

      // Display an error message
      message.error(error.message);
    }
  };

  // Use effect hook to fetch bus details when the component mounts
  useEffect(() => {
    getBus();
  }, []);

  // Render the BookNow component with bus details and seat selection
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30, 30]}>
          {/* Display bus details and selected seats */}
          <Col lg={12} xs={24} sm={24}>
            {/* Bus details section */}
            <h1 className="text-2xl primary-text">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />

            <div className="flex flex-col gap-2">
              <p className="text-md">Journey Date: {bus.journeyDate}</p>
              <p className="text-md">Fare: ₹ {bus.fare} /-</p>
              <p className="text-md">Departure Time: {bus.departure}</p>
              <p className="text-md">Arrival Time: {bus.arrival}</p>
              <p className="text-md">Capacity: {bus.capacity}</p>
              <p className="text-md">
                Seats Left: {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />

            {/* Selected seats and fare section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">
                Selected Seats: {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-2xl mt-2">
                Fare: {bus.fare * selectedSeats.length} /-
              </h1>
              <hr />

              {/* Button to book selected seats */}
              <button
                className={`primary-btn ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
                disabled={selectedSeats.length === 0}
                onClick={bookNow}
              >
                Book Now
              </button>
            </div>
          </Col>

          {/* Seat selection component */}
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

// Export the BookNow component
export default BookNow;
