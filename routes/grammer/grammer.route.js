const express = require("express");
const router = express.Router();
const {
  createGrammer,
  getAllGrammer,
  getAGrammer,
  updateGrammer,
  deleteGrammer,
} = require("./grammer.controller");

router.route("/").post(createGrammer).get(getAllGrammer);
router
  .route("/:id")
  .get(getAGrammer)
  .patch(updateGrammer)
  .delete(deleteGrammer);

module.exports = router;
