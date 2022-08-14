var express = require("express");
var router = express.Router();
const usersController = require("../controller/usersController");

// UsersController
router.route("/").post(usersController.createUser);
router.route("/login").post(usersController.loginUser);
router.route("/:id").get(usersController.getUser);

module.exports = router;
