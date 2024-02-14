// Import necessary React components, styles, and libraries
import React from "react";
import "../resources/global.css";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

// Import Redux actions
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

// Functional component for user registration
function Register() {
  // Initialize necessary hooks and variables
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Show loading state during registration process
      dispatch(ShowLoading());

      // Make a POST request to the server to register the user
      const response = await axios.post("/api/users/register", values);

      // Hide loading state after registration process
      dispatch(HideLoading());

      // Check the server response and display appropriate messages
      if (response.data.success) {
        message.success(response.data.message);
        // Redirect to the login page after successful registration
        navigation("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // Hide loading state if an error occurs during registration
      dispatch(HideLoading());

      // Display an error message
      message.error(error.message);
    }
  };

  // Render the registration form
  return (
    <div className="h-screen d-flex justify-content-center align-items-center">
      <div className="w-400 card p-3">
        <h1 className="text-lg">NewGo - Register</h1>
        <hr />

        {/* Ant Design Form for user registration */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" />
          </Form.Item>

          {/* Display link to login page and register button */}
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/login">Click here to Login</Link>
            <button className="secondary-btn" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// Export the Register component
export default Register;
