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

const Count = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username required"]
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Count', Count)