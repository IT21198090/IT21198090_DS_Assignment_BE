const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instroctor.controller");

router.post("/register", instructorController.registerInstructor);
router.post("/login", instructorController.loginInstructor);
router.patch("/:id", instructorController.updateInstructor);
router.delete("/:id", instructorController.deleteInstructor);
router.get("/", instructorController.getAllInstructors);
module.exports = router;
