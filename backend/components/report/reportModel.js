const mongoose = require('mongoose');

const { Schema } = mongoose;

const reportSchema = new Schema({
  content: {
    required: true,
    type: String
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

reportSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;
  }
});

module.exports = mongoose.model('Report', reportSchema);
