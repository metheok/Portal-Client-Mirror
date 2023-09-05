const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema({ any: Object });

module.exports = mongoose.model("Bank", bankSchema);
