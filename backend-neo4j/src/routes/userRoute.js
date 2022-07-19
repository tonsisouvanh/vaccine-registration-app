const express = require("express");
const { getUsers } = require("../controllers/userController.js");
// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// * GET
// get all User
// Private route for Admin
router.get("/", getUsers);

module.exports = router;
