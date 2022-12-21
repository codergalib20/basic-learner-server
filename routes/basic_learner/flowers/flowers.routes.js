const express = require("express");
const {
  getAllFlowers,
  deleteFlower,
  createFlower,
} = require("./flowers.controller");
const router = express.Router();

router.route("/").post(createFlower);
router.get("/", getAllFlowers);
router.delete("/:id", deleteFlower);

module.exports = router;
