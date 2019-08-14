const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  reviewsPosted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, object) => {
    delete object.__v;

    // since it's good practice to not show this.
    delete object.passwordHash;
  }
});

module.exports = mongoose.model('User', userSchema);
