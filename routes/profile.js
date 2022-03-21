const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/edit/:id", async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPass;
  }
  try {
    const updated = await User.findByIdAndUpdate(
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
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const isDeleted = await User.findByIdAndDelete(req.params.id);
    if (isDeleted) {
      res.json(isDeleted);
    }
  } catch (error) {
    res.json(error);
  }
});
router.get("/show/:id", async (req, res) => {
  const { id } = req.params;
  const data = await User.findOne({ username: id });
  const { password, ...others } = data._doc;
  res.json(others);
});
module.exports = router;
