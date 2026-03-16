
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION)
    console.log(` MongoDB connected`);
  } catch (error) {
    console.error(` MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;