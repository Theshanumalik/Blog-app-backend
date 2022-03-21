const Comment = require("../models/Comment");
const router = require("express").Router();

router.post("/create/", async (req, res) => {
  const { desc, user, post_id } = req.body;
  try {
    const newComment = await Comment.create({
      desc,
      user,
      post_id,
    });
    res.json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  const { post_id } = req.query;
  try {
    const comments = await Comment.find({ post_id });
    res.json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
