const mongoose = require('mongoose');
const { Schema } = mongoose;

// message model for public chat room

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  }
});

messageSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});

module.exports = mongoose.model('Message', messageSchema);
