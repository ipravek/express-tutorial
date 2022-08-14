const mongoose = require("mongoose");
const { MONGO_DB } = process.env;

exports.connect = () => {
  try {
    const conn = mongoose.connect(MONGO_DB, {});
    if (conn) {
      console.log("Successfully connected to database");
    }
  } catch (e) {
    console.log(e);
  }
};
