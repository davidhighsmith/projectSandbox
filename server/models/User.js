const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: Number,
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

userSchema.plugin(AutoIncrement, { id: 'user_seq' });
module.exports = User = mongoose.model('User', userSchema);
