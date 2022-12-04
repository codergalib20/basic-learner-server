const express = require("express");

const router = express.Router();

const {
  createAnimal,
  getAllAnimals,
  getAllAnimalsByPagination,
  getAllAnimalsName,
  getSingleAnimalByPath,
} = require("./animals.controller");

router.post("/", createAnimal);
router.get("/", getAllAnimals);
router.get("/pagination", getAllAnimalsByPagination);
router.get("/name", getAllAnimalsName);
router.get("/:path", getSingleAnimalByPath);

module.exports = router;
