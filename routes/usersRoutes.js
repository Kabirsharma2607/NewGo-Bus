// Import necessary modules and configurations
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware");

// Route for user registration
router.post("/register", async (req, res) => {
  // Validation function for password
  const validPassword = (password) => {
    // Minimum length of 8 characters
    if (password.length < 8) {
      return {
        valid: false,
        message: "Password must be at least 8 characters long.",
      };
    }

    // Maximum length of 16 characters
    if (password.length > 16) {
      return {
        valid: false,
        message: "Password shouldn't be more than 16 characters.",
      };
    }

    // Should not contain spaces
    if (/\s/.test(password)) {
      return {
        valid: false,
        message: "Password should not contain spaces.",
      };
    }

    // Should contain at least 1 special character, 1 upper case, 1 lower case, and 1 number
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    if (
      !specialCharRegex.test(password) ||
      !upperCaseRegex.test(password) ||
      !lowerCaseRegex.test(password) ||
      !numberRegex.test(password)
    ) {
      return {
        valid: false,
        message:
          "Password must contain at least 1 special character, 1 upper case letter, 1 lower case letter, and 1 number.",
      };
    }

    // If all criteria are met, the password is considered valid
    return { valid: true, message: "Password is valid." };
  };

  const validEmail = (email) => {
    // Use a regular expression to check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: "Enter valid E-mail address.",
      };
    }

    // If the email is valid, return an object with valid: true
    return { valid: true, message: "Email is valid." };
  };

  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    // If exists, return an error response
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }
    // Validate the email using the validEmail function
    const validationEmail = validEmail(req.body.email);
    // If not valid, return an error response
    if (!validationEmail.valid) {
      return res.send({
        message: validationEmail.message,
        success: false,
        data: null,
      });
    }
    // Validate the password using the validPassword function
    const validationResult = validPassword(req.body.password);
    // If not valid, return an error response
    if (!validationResult.valid) {
      return res.send({
        message: validationResult.message,
        success: false,
        data: null,
      });
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    // Create a new User instance with the hashed password
    const newUser = new User(req.body);
    // Save the new user to the database
    await newUser.save();
    // Return a success response

    res.send({
      message: "User created Successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    // Check if the user with the provided email exists
    const userExists = await User.findOne({ email: req.body.email });
    // If not exists, return an error response
    if (!userExists) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    // Compare the provided password with the hashed password in the database
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    // If passwords do not match, return an error response
    if (!passwordMatched) {
      return res.send({
        message: "Wrong Password",
        success: false,
        data: null,
      });
    }
    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        userId: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Return a success response with the token
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// Route to get user by ID (protected route using authMiddleware)
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    // Fetch the user from the database using the user ID from the request body
    const user = await User.findById(req.body.userId);
    // Return a success response with the user data
    res.send({
      message: "User fetched Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    // Return an error response if any exception occurs
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// Export the router for use in the main application
module.exports = router;
