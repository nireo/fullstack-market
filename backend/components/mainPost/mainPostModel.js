const mongoose = require('mongoose');

const { Schema } = mongoose;

const mainSchema = new Schema({
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
    required: true,
    min: 0
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

mainSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});

module.exports = mongoose.model('Main', mainSchema);
