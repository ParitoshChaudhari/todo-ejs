const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dbConnect = async () => {
  try {
    const status = await mongoose.connect(process.env.MONGODB_URL);
    if (status) {
      console.log("DB Connected Successfully...");
    }
  } catch (err) {
    console.log("error in DB Connection", err);
  }
};

module.exports = dbConnect;
