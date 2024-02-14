// Import necessary React components, hooks, styles, and libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, Row, message } from "antd";
import Bus from "../components/Bus";

// Functional component for the home page
function Home() {
  // Initialize necessary hooks and variables
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  // Use effect hook to fetch buses when the component mounts
  useEffect(() => {
    getBuses();
  }, []);

  // Function to fetch all buses from the server
  const getBuses = async () => {
    try {
      // Show loading state during the data fetching process
      dispatch(ShowLoading());

      // Make a POST request to the server to get all buses
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});

      // Hide loading state after data fetching process
      dispatch(HideLoading());

      // Check the server response and update the state with fetched data
      if (response.data.success) {
        setBuses(response.data.data);
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

  // Retrieve user information from the Redux state
  const { user } = useSelector((state) => state.users);

  // Render the home page with a list of buses
  return (
    <div>
      {/* Optional: Add any additional elements or sections for the home page */}

      {/* Display a row of buses */}
      <Row>
        {buses.map((bus) => (
          <Col lg={12} xs={24} sm={24} key={bus._id}>
            {/* Render the Bus component for each bus */}
            <Bus bus={bus} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

// Export the Home component
export default Home;
