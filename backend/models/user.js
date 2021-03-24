const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  reports: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Report",
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
});

UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
