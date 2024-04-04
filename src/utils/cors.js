// utils/cors.js

import Cors from "cors";

// Initialize the CORS middleware
const corsMiddleware = Cors({
  origin: true, // Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Specify the allowed headers
});

export default corsMiddleware;
