const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", auth, userController.getUser);
router.get("/:id", auth, userController.getUserById);
router.patch("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
