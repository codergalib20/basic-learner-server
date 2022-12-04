const express = require("express");
const { addAVocabulary, getVocabulary } = require("./vocabulary.controller");
const router = express.Router();

router.post("/", addAVocabulary);
router.get("/", getVocabulary);
// router.get("/:id");
// router.delete("/:id");
// router.patch("/:id");

module.exports = router;
