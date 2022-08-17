import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  id: {
    type: String,
  },
});



export default mongoose.model("User", userSchema);
