const express = require("express");
const {
  addAVocabulary,
  getVocabulary,
  getOneBySlug,
  getAllVocabluaryByPagination,
} = require("./vocabulary.controller");
const router = express.Router();

router.post("/", addAVocabulary);
router.get("/", getVocabulary);
router.get("/slug/:slug", getOneBySlug);
router.get("/pagination", getAllVocabluaryByPagination);
// router.get("/:id");
// router.delete("/:id");
// router.patch("/:id");

module.exports = router;
