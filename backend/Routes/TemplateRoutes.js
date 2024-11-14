const express = require("express");
const router = express.Router();

const templateModel = require("../Models/TemplateModel");

router.post("/", async (req, res) => {
  try {
    let details = req.body;
    let details1 = await templateModel.create(details);
    res.status(200).json({ Message: "Registration successful" });
  } catch (err) {
    res.status(400).json({ Message: `Error : ${err}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let details = await templateModel.findOne({ userId: id });
    if (!details) {
      return res.status(404).send(null);
    }
    res.status(201).json(details);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const details = req.body;
    const userId = req.params.id;

    const updateuser = await templateModel.findOneAndUpdate(
      { userId: userId },
      details,
      { new: true }
    );

    if (!updateuser) {
      return res.status(404).json({ Error: "No user found" });
    }
    res.status(200).json({ data: updateuser });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = router;
