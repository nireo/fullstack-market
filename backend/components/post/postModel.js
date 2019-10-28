const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
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
  price: {
    type: Number,
    required: true
  },
  posted: {
    type: String,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

postSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});

postSchema.index(
  {
    title: 'text',
    description: 'text'
  },
  {
    weights: {
      title: 5,
      description: 1
    }
  }
);

module.exports = mongoose.model('Post', postSchema);
