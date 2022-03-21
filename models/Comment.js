const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("comment", CommentSchema);
Comment.createIndexes();
module.exports = Comment;
