// Import the Mongoose library
const mongoose = require("mongoose");

// Define the bus schema
const busSchema = new mongoose.Schema({
  // Name of the bus
  name: {
    type: String,
    required: true,
  },
  // Bus number
  number: {
    type: String,
    required: true,
  },
  // Maximum capacity of the bus
  capacity: {
    type: Number,
    required: true,
  },
  // Starting location
  from: {
    type: String,
    required: true,
  },
  // Destination location
  to: {
    type: String,
    required: true,
  },
  // Date of the journey
  journeyDate: {
    type: String,
    required: true,
  },
  // Departure time
  departure: {
    type: String,
    required: true,
  },
  // Arrival time
  arrival: {
    type: String,
    required: true,
  },
  // Type of the bus (e.g., AC, Non-AC)
  type: {
    type: String,
    required: true,
  },
  // Fare for the journey
  fare: {
    type: Number,
    required: true,
  },
  // Array to track booked seats
  seatsBooked: {
    type: Array,
    default: [],
  },
  // Status of the bus (default is "Yet To Start")
  status: {
    type: String,
    default: "Yet To Start",
  },
});

// Export the Mongoose model for the 'buses' collection
module.exports = mongoose.model("buses", busSchema);
