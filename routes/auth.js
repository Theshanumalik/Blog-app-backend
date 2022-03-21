const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { name, username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  try {
    const newUser = await User.create({
      name,
      username,
      password: hashPass,
      email,
    });
    const { password, ...others } = newUser._doc;
    res.json({ success: true, data: others });
  } catch (error) {
    res.json(error);
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const isExist = await User.findOne({ username });
    if (!isExist) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const validate = await bcrypt.compare(password, isExist.password);
    if (validate) {
      const { password, ...others } = isExist._doc;
      res.json({ ...others });
    }
  } catch (error) {
    res.json(error);
  }
});
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
module.exports = router;
