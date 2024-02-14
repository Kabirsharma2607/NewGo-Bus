// Load environment variables from a .env file
require("dotenv").config();

// Import required modules and configurations
const express = require("express");
const dbConfig = require("./config/dbConfig");
const app = express();
const cors = require("cors");

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Set the port to the value specified in the environment variable or 5000 if not available
const port = process.env.PORT || 5000;

// Import routes for different parts of the API
const usersRoute = require("./routes/usersRoutes");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

// Use the defined routes for specific endpoints
app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});
