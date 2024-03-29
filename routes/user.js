const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require('../controller/user.js');
const { saveRedirectUrl } = require("../middleware.js");
const passport = require("passport");

router.route("/signup")
    .get(wrapAsync(userController.signUpForm))
    .post(wrapAsync(userController.signUpReq));

router.route("/login")
    .get(wrapAsync(userController.loginForm))
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }), userController.loginReq);

router.get("/logout", userController.logoutReq);

module.exports = router;