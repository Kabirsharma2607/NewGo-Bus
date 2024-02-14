// Import necessary React components, styles, and libraries
import React from "react";
import "../resources/global.css";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

// Import Redux actions
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

// Functional component for user login
function Login() {
  // Initialize necessary hooks and variables
  const navigateToHome = useNavigate();
  const dispatch = useDispatch();

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Show loading state during login process
      dispatch(ShowLoading());

      // Make a POST request to the server to authenticate the user
      const response = await axios.post("/api/users/login", values);

      // Hide loading state after login process
      dispatch(HideLoading());

      // Check the server response and display appropriate messages
      if (response.data.success) {
        message.success(response.data.message);

        // Store the authentication token in local storage
        localStorage.setItem("token", response.data.data);

        // Redirect to the home page after successful login
        navigateToHome("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // Hide loading state if an error occurs during login
      dispatch(HideLoading());

      // Display an error message
      message.error(error.message);
    }
  };

  // Render the login form
  return (
    <div className="h-screen d-flex justify-content-center align-items-center">
      <div className="w-400 card p-3">
        <h1 className="text-lg">NewGo - Login</h1>
        <hr />

        {/* Ant Design Form for user login */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" />
          </Form.Item>

          {/* Display link to registration page and login button */}
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register">Click here to Register</Link>
            <button className="secondary-btn" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// Export the Login component
export default Login;
