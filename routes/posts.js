const Post = require("../models/Post");

const router = require("express").Router();

router.post("/create/:username", async (req, res) => {
  const { title, desc, catagory, photo } = req.body;
  try {
    const newPost = await Post.create({
      title,
      desc,
      catagory,
      user: req.params.username,
      photo,
    });
    res.json({ data: newPost, success: false });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/edit/:id", async (req, res) => {
  const isPostExist = await Post.findById(req.params.id);
  if (isPostExist) {
    if (isPostExist.user === req.body.user) {
      try {
        const updated = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.json({ success: true, data: updated });
      } catch (error) {
        res.json(error);
      }
    }
  } else {
    res.status(404).json({ error: "post not exists", success: false });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const isPostExist = await Post.findById(req.params.id);
  if (isPostExist) {
    if (isPostExist.user === req.body.user) {
      try {
        const isDeleted = await Post.findByIdAndDelete(req.params.id);
        if (isDeleted) {
          res.json(isDeleted);
        }
      } catch (error) {
        res.json(error);
      }
    }
  }
});
router.get("/", async (req, res) => {
  const { username, cat, id } = req.query;
  if (username) {
    const posts = await Post.find({ user: username });
    return res.json(posts);
  }
  if (cat) {
    const posts = await Post.find({ catagory: cat });
    return res.json(posts);
  }
  if (id) {
    const posts = await Post.findById(id);
    return res.json(posts);
  }
  const posts = await Post.find();
  res.json(posts);
});
module.exports = router;
