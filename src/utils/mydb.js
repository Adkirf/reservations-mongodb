const { MongoClient, ServerApiVersion } = require("mongodb");

const mongoose = require("mongoose");

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Export the function to connect to MongoDB
module.exports = dbConnect;
