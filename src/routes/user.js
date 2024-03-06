const express = require("express");
const { getUserProfile } = require("../controllers/user");

const router = express.Router();

router.route("/users/profile").get(getUserProfile);

module.exports = router;
