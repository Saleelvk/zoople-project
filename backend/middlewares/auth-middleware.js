const jwt = require("jsonwebtoken");
const User = require("../models/auth-model");
const asyncHandler = require("express-async-handler");

// Middleware to authenticate user by checking both Bearer token and cookies
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // Log headers and cookies for debugging
  console.log("Request Headers:", req.headers);
  console.log("Cookies:", req.headers.cookie);

  // Check for Bearer token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract token from Bearer
    console.log("Token from Authorization header:", token);
  } else if (req.headers.cookie) {
    // Fallback to cookies if Bearer token is not present
    const cookies = req.headers.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    if (tokenCookie) {
      token = tokenCookie.split("=")[1]; // Get token from cookies
      console.log("Token from Cookie:", token);
    }
  }

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user and attach the user object to req.user (without password)
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .json({ message: "Not authorized, token verification failed" });
  }
});

// Middleware to check if the user is an admin
const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log("Admin access granted:", req.user._id);
    next();
  } else {
    console.log("Admin access denied:", req.user ? req.user._id : "No user");
    return res.status(401).json({ message: "Not Authorized as an admin" });
  }
});

module.exports = { authMiddleware, adminOnly };
