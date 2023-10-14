const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);

const User = new Schema({
  username: {
      type: String,
      required: [true, "Username required"]
  },
  password: {
      type: String,
      required: [true, "Password required"]
  }
});

module.exports = mongoose.model('User', User)