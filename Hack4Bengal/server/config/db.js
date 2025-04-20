
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remove deprecated options and use modern connection approach
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Please make sure MongoDB is running on your system');
    process.exit(1);
  }
};

module.exports = connectDB;
