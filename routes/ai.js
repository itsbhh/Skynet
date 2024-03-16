const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const path = require('path');


const aiController = require("../controller/ai.js");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// File filter for PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


router.route('/')
    .get(wrapAsync(aiController.index))
    .post(upload.single('pdfFile'), wrapAsync(aiController.answer));


module.exports = router;