// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Middleware function for user authentication
module.exports = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is missing
    if (!token) {
      return res.status(401).send({
        message: "Authorization failed - Token missing",
        success: false,
      });
    }

    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request body
    req.body.userId = decoded.userId;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Return an error response if token verification fails
    res.status(401).send({
      message: "Authorization failed - Invalid token",
      success: false,
    });
  }
};
