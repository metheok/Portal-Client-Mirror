const { Config } = require("../../configs/config");
const mongoose = require("mongoose");

class DatabaseLoader {
  static init() {
    // Connect to MongoDB
    const connectString = Config.DB_USER
      ? `mongodb+srv://${Config.DB_USER}:${Config.DB_PASS}@${Config.DB_CLUSTERNAME}`
      : `mongodb://${Config.DB_HOST}/${Config.DB_DATABASE}`;
    mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
  }
}

module.exports = { DatabaseLoader };
