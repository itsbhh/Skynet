const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const aiController = require("../controller/ai.js");


router.route('/')
    .get(wrapAsync(aiController.index))
    .post(upload.single('ai[file]'), wrapAsync(aiController.answer));


module.exports = router;