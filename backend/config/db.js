const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed.", err);
    ptoces.exit(1);
  }
};

module.exports = db;