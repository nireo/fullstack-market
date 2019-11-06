const mongoose = require('mongoose');

const { Schema } = mongoose;

// this isn't meant as messages between users. This is more of a notification
// for when someone buys your product for example or new review.

const messageSchema = new Schema({
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    default: Date.now()
  }
});

messageSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});
