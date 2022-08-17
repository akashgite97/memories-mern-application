import mongoose from 'mongoose';

const postMessageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required:true
  },
  message: String,
  creator: String,
  name:String,
  tags: [String],
  image: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMeaage', postMessageSchema);

export default PostMessage;
