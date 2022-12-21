const express = require("express");
const {
  getAllFruits,
  deleteFruit,
  createFruit,
} = require("./fruits.controller");
const router = express.Router();

router.route("/").post(createFruit);
router.get("/", getAllFruits);
router.delete("/:id", deleteFruit);

module.exports = router;
