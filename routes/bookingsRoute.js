// Import necessary modules and configurations
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");

// Route to book seats
router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    // Create a new Booking instance with provided data

    const newBooking = new Booking({
      ...req.body,
      transactionId: "1234",
      user: req.body.userId,
    });
    // Save the new booking to the database
    await newBooking.save();
    // Find the bus associated with the booking
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    // Update the seatsBooked array in the bus model
    await bus.save();
    // Return a success response with the new booking data
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  }
});

// Route to make payment

router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    // Extract token and amount from the request body

    const { token, amount } = req.body;
    // Create a customer with the provided email and token using the Stripe API
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    // Charge the customer with the specified amount
    const payment = await stripe.charges.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    // If payment is successful, return a success response with the transactionId
    if (payment) {
      res.status(200).send({
        message: "Payment successful",
        data: {
          transactionId: payment.source.id,
        },
        success: true,
      });
      // If payment fails, return an error response
    } else {
      res.status(500).send({
        message: "Payment failed",
        data: error,
        success: false,
      });
    }
  } catch (error) {
    // Return an error response if any exception occurs
    console.log(error);
    res.status(500).send({
      message: "Payment failed",
      data: error,
      success: false,
    });
  }
});

// Route to get bookings by user ID
router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
  try {
    // Fetch bookings from the database for the specified user ID
    // Populate the 'bus' and 'user' fields in the booking data
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("bus")
      .populate("user");
    res.status(200).send({
      // Return a success response with the fetched bookings
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

// Route to get all bookings
router.post("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    // Fetch all bookings from the database
    // Populate the 'bus' and 'user' fields in the booking data
    const bookings = await Booking.find().populate("bus").populate("user");
    res.status(200).send({
      // Return a success response with the fetched bookings
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

// Export the router for use in the main application
module.exports = router;
