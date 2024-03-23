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
    const allowedMimeTypes = ['application/pdf', 'application/vnd.ms-excel', 'image/jpeg', 'image/png', 'image/gif']; // Add image MIME types here
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedMimeTypes.includes(file.mimetype) || fileExtension === '.xlsx') {
        cb(null, true);
    } else {
        cb(new Error('File format incorrect'), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


router.route('/')
    .get(wrapAsync(aiController.index))
    .post(upload.single('file'), wrapAsync(aiController.answer));


module.exports = router;