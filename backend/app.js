const express = require('express');
const path = require('path');
const cors = require('cors'); // Importing CORS
const connectDB = require('./db/db');
const apiRouter = require('./routes/auth-routes');
const productRouter = require('./routes/product-rout');
const cartRoute = require('./routes/addToCart');
const orderRoute =require("./routes/orderRoute")
require('dotenv').config();
const Port = process.env.PORT||4000;

const app = express();



const cookieParser = require('cookie-parser');
app.use(cookieParser());



const allowedOrigins = [
  'http://localhost:5174', // Your Vite app
  'http://localhost:5173',     // Another allowed origin
  // Add more origins as needed
];
// Apply CORS middleware before routes
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'OPTIONS',"DELETE"],

  credentials: true, // Ensure credentials (cookies, etc.) are allowed
}));




// Enable preflight requests (OPTIONS)
app.options('*', cors());

// Middleware to handle JSON and URL-encoded form data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/v1/auth', apiRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order',orderRoute)

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads/')));

// Connect to the database and start the server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
  connectDB();
});
