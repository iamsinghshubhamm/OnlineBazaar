const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('\x1b[44m',"Connected to MongoDB",'\x1b[0m');
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
