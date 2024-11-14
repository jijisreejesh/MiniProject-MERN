const express = require("express");
const router = express.Router();
const upload = require("../server");
const imageModel = require("../Models/ImageModel");

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "aboutImage", maxCount: 1 },
    { name: "work1", maxCount: 1 },
    { name: "work2", maxCount: 1 },
    { name: "work3", maxCount: 1 },
    { name: "serviceIcon1", maxCount: 1 },
    { name: "serviceIcon2", maxCount: 1 },
    { name: "serviceIcon3", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const uploaded = await imageModel.create({
        templateId: req.body.templateId,
        userId: req.body.userId,

        // Saving URLs from Cloudinary for each file field
        image: req.files["image"] ? req.files["image"][0].path : null,
        aboutImage: req.files["aboutImage"]
          ? req.files["aboutImage"][0].path
          : null,
        work1: req.files["work1"] ? req.files["work1"][0].path : null,
        work2: req.files["work2"] ? req.files["work2"][0].path : null,
        work3: req.files["work3"] ? req.files["work3"][0].path : null,
        serviceIcon1: req.files["serviceIcon1"]
          ? req.files["serviceIcon1"][0].path
          : null,
        serviceIcon2: req.files["serviceIcon2"]
          ? req.files["serviceIcon2"][0].path
          : null,
        serviceIcon3: req.files["serviceIcon3"]
          ? req.files["serviceIcon3"][0].path
          : null,
      });

      res.json({ message: "File Uploaded", uploaded });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Upload failed", error });
    }
  }
);

router.put(
  "/:userId",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "aboutImage", maxCount: 1 },
    { name: "work1", maxCount: 1 },
    { name: "work2", maxCount: 1 },
    { name: "work3", maxCount: 1 },
    { name: "serviceIcon1", maxCount: 1 },
    { name: "serviceIcon2", maxCount: 1 },
    { name: "serviceIcon3", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const updateFields = {};

      // Check each file field and add it to updateFields if present
      if (req.files["image"]) {
        updateFields.image = req.files["image"][0].path;
      }
      if (req.files["aboutImage"]) {
        updateFields.aboutImage = req.files["aboutImage"][0].path;
      }
      if (req.files["work1"]) {
        updateFields.work1 = req.files["work1"][0].path;
      }
      if (req.files["work2"]) {
        updateFields.work2 = req.files["work2"][0].path;
      }
      if (req.files["work3"]) {
        updateFields.work3 = req.files["work3"][0].path;
      }
      if (req.files["serviceIcon1"]) {
        updateFields.serviceIcon1 = req.files["serviceIcon1"][0].path;
      }
      if (req.files["serviceIcon2"]) {
        updateFields.serviceIcon2 = req.files["serviceIcon2"][0].path;
      }
      if (req.files["serviceIcon3"]) {
        updateFields.serviceIcon3 = req.files["serviceIcon3"][0].path;
      }

      // If there are no updated fields, return early
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      // Update the document in MongoDB with only the new fields
      const updatedUser = await imageModel.findOneAndUpdate(
        { userId: userId },
        { $set: updateFields },
        { new: true }
      );

      res.json({ message: "File(s) uploaded successfully", updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update Failed", error });
    }
  }
);

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const image = await imageModel.findOne({ userId });

    if (!image) {
      return res.status(404).send(null);
    }
    return res.status(200).send(image);
  } catch (err) {
    console.log("Error in fetching data  : ", err);
    res.status(500).json({ message: "Error fetching image data : ", err });
  }
});

module.exports = router;
