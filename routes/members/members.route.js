const express = require("express");
const {
  createMember,
  getAllMembers,
  getSingleMember,
  updateSingleMember,
  deleteSingleMember,
} = require("./members.controller");
const router = express.Router();
router.get("/members", getAllMembers);
module.exports = router;
