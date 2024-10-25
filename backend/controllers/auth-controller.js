const asyncHandler = require("express-async-handler");
const User = require("../models/auth-model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generate-token");
module.exports = {
  register: asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const user = await User.find({
      email: req.body.email,
      username: req.body.username,
    });
    if (user.length > 0) {
      res.status(400).json({
        error: "User already exists with this email",
      });
    } else { 
      //hash password
      const hashpassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        name,
        username,
        email,
        password: hashpassword,
      }); 

      await user.save();

      generateToken(res, user._id); 

      res.status(201).json({
        message: "User created successfully",
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({
            error: "User logged unsuccessfully",
        });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) { 
        const token = generateToken(res, user._id); // Get the token

        res.status(201).json({
            message: "User logged in successfully",
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token, // Send token in response
        });
    } else {
        res.status(400);
        throw new Error("Incorrect password or username");
    }
}),


logout: asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }); // This removes the cookie
  res.status(200).json({ message: "User logged out successfully" });
}),
};
