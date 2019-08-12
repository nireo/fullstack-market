const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({});

reviewSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});

module.exports = mongoose.model('Review', reviewSchema);
