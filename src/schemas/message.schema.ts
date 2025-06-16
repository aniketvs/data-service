import { Schema } from 'mongoose';

export default {
  modelName: 'Message',
  schema: new Schema({
    fromUserId: Number,
    fromUserNumber: String,
    toUserId: Number,
     toUserNumber: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }),
};
