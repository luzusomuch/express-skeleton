import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: 'String',
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Token', TokenSchema);
