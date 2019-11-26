const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact', contactSchema);
