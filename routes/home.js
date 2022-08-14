var express = require("express");
var router = express.Router();
const homeController = require("../controller/homeController");
const auth = require("../middleware/auth");

// WelcomeController
router.route("/").get(auth, homeController.index);

module.exports = router;
