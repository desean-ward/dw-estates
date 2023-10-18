const express = require("express");
const authCtrl = require("../../controllers/auth/auth.controller");

const router = express.Router();

router.post("/signup", authCtrl.signup);
router.post("/signin", authCtrl.signin);

module.exports = router;
