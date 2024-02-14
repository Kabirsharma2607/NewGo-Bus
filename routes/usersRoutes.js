const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// When new user registers
router.post("/register", async (req, res) => {
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
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }

    const validationEmail = validEmail(req.body.email);
    if (!validationEmail.valid) {
      return res.send({
        message: validationEmail.message,
        success: false,
        data: null,
      });
    }

    const validationResult = validPassword(req.body.password);

    if (!validationResult.valid) {
      return res.send({
        message: validationResult.message,
        success: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created Successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordMatched) {
      return res.send({
        message: "Wrong Password",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign(
      {
        userId: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// Get user by ID
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User fetched Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

module.exports = router;
