// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Name of the user
    name: {
      type: String,
      required: true,
    },
    // Email of the user
    email: {
      type: String,
      required: true,
    },
    // Password of the user
    password: {
      type: String,
      required: true,
    },
    // isAdmin flag to indicate if the user has admin privileges (default is false)
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Include timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Export the Mongoose model for the 'users' collection
module.exports = mongoose.model("users", userSchema);
