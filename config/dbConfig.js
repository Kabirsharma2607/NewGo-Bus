// Import the Mongoose library
const mongoose = require("mongoose");

// Connect to the MongoDB database using the provided URL from the environment variables
mongoose.connect(process.env.MONGODB_URL);

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.on("connected", () => {
  console.log("Connected to the database");
});

// Event listener for connection error
db.on("error", (error) => {
  console.error("Connection to the database failed:", error.message);
});
