const express = require("express");
const router = express.Router();
const {
  createBird,
  getAllBirds,
  getAllBirdsByPagination,
  getAllBirdsName,
  getSingleBirdByPath,
} = require("./birds.controller");

router.post("/", createBird);
router.get("/", getAllBirds);
router.get("/pagination", getAllBirdsByPagination);
router.get("/name", getAllBirdsName);
router.get("/:path", getSingleBirdByPath);

module.exports = router;
