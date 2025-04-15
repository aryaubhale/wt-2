const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("MONGO_URI from env:", uri); // 🔍 Debugging line

    if (!uri) {
      throw new Error("MONGO_URI is undefined. Check your .env file and dotenv setup.");
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
