const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    user: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("post", postSchema);
Post.createIndexes();
module.exports = Post;
