// Import necessary modules and configurations
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Bus = require("../models/busModel");

// Route to add a new bus
router.post("/add-bus", async (req, res) => {
  try {
    // Check if a bus with the provided number already exists
    const existingBus = await Bus.findOne({ number: req.body.number });
    // If exists, return an error response
    if (existingBus) {
      return res.status(200).send({
        success: false,
        message: "Bus already exists",
      });
    }
    // Create a new Bus instance with the request body data
    const newBus = new Bus(req.body);
    // Save the new bus to the database
    await newBus.save();
    // Return a success response
    return res.status(200).send({
      success: true,
      message: "Bus added successfully",
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({ success: false, message: error.message });
  }
});

// Route to get all buses (protected route using authMiddleware)
router.post("/get-all-buses", authMiddleware, async (req, res) => {
  try {
    // Fetch all buses from the database
    const buses = await Bus.find();
    // Return a success response with the list of buses
    return res.status(200).send({
      success: true,
      message: "Buses fetched Successfully",
      data: buses,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// Route to update a bus (protected route using authMiddleware)
router.post("/update-bus", authMiddleware, async (req, res) => {
  try {
    // Update the bus in the database using the provided _id and request body data
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    // Return a success response
    return res.status(200).send({
      success: true,
      message: "Bus updated successfully",
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({ success: false, message: error.message });
  }
});

// Route to delete a bus (protected route using authMiddleware)
router.post("/delete-bus", authMiddleware, async (req, res) => {
  try {
    // Delete the bus from the database using the provided _id
    await Bus.findByIdAndDelete(req.body._id);
    // Return a success response
    return res.status(200).send({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// Route to get a bus by ID (protected route using authMiddleware)
router.post("/get-bus-by-id", authMiddleware, async (req, res) => {
  try {
    // Fetch the bus from the database using the provided _id
    const bus = await Bus.findById(req.body._id);
    // Return a success response with the bus data
    return res.status(200).send({
      success: true,
      message: "Bus fetched successfully",
      data: bus,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({ success: false, message: error.message });
  }
});

// Export the router for use in the main application
module.exports = router;
