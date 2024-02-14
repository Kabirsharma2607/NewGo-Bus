// Import the Mongoose library
const mongoose = require("mongoose");

// Define the booking schema
const bookingSchema = new mongoose.Schema(
  {
    // Reference to the 'buses' collection using ObjectId
    bus: {
      type: mongoose.Schema.ObjectId,
      ref: "buses",
      required: true,
    },
    // Reference to the 'users' collection using ObjectId
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    // Array of seats booked for the booking
    seats: {
      type: Array,
      required: true,
    },
    // Transaction ID for the booking
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    // Include timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Export the Mongoose model for the 'bookings' collection
module.exports = mongoose.model("bookings", bookingSchema);
