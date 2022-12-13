const express = require("express");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

router.post("/image", async (req, res) => {
  try {
    const files = req.files;
    if (files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    // upload only jpg, jpeg, png of file
    if (
      files.image.mimetype !== "image/jpeg" &&
      files.image.mimetype !== "image/png" &&
      files.image.mimetype !== "image/jpg"
    ) {
      return res
        .status(400)
        .json({ error: "Only jpg, jpeg, png file allowed" });
    }
    // check file size max 3mb
    if (files.image.size > 1024 * 1024 * 3) {
      return res.status(400).json({ error: "File size is too large" });
    }
    // set a custom url for the image
    const result = await cloudinary.uploader.upload(files.image.tempFilePath, {
      folder: "career_olympiad",
      use_filename: true,
    });
    return res
      .status(200)
      .json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    return res.status(500).json({ err: err, error: "Something went wrong!" });
  }
});

module.exports = router;
