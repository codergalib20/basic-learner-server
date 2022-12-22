const express = require("express");
const router = express.Router();
const {
  createGrammer,
  addTagInGrammer,
  getGrammerParent,
  updateAGrammer,
  getDraftGrammer,
  deleteGrammer,
  getOneBySlug,
  getAllGrammer,
} = require("./grammer.controller");
// Create and Get
router.route("/").post(createGrammer).get(getAllGrammer);
router.post("/tag/:id", addTagInGrammer);
router.get("/grammer-parent", getGrammerParent);
router.get("/status", getDraftGrammer);
router.patch("/update/:id", updateAGrammer);
router.delete("/:id", deleteGrammer);
router.get("/slug/:slug", getOneBySlug);
module.exports = router;
