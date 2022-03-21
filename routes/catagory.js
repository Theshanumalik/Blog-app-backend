const Catagory = require("../models/Catagory");
const router = require("express").Router();

router.post("/create/", async (req, res) => {
  const { name } = req.body;
  try {
    const newCat = await Catagory.create({
      name,
    });
    res.json({ data: newCat, success: false });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const cats = await Catagory.find();
    res.json({ data: cats, success: false });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
