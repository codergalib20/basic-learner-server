const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error(colors.red("📕", error));
  }
};

module.exports = connectDB;
