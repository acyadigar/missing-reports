const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  url: String,
  author: String,
  location: {
    type: String,
    minlength: 2,
    required: true,
  },
  info: {
    type: String,
    minlength: 10,
    required: true,
  }
});

const ReportModel = mongoose.model('Report', ReportSchema)
module.exports = ReportModel