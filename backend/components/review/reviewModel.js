const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  recommended: {
    type: Boolean,
    required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  helpfulCount: {
    type: Number,
    default: 0
  }
});

reviewSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});

module.exports = mongoose.model('Review', reviewSchema);
