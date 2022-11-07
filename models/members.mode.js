const mongoose = require("mongoose");

const MembersSchema = mongoose.Schema({});


const Member = mongoose.model("Member", MembersSchema);
module.exports = Member