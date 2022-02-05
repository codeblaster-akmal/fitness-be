'use strict';

const multer = require("multer");
const path = require("path");

const destination = async (req, file, cb) => {
    if (req.url === "/configurations") {
        return cb(null, './public/images/qrcode');
    } else {
        return cb(null, './public/images/members');
    }
}

const filename = (req, file, cb) => {
    cb(
        null,
        new Date().toISOString().replace(/:/, '-').replace(/T/, '-').replace(/\..+/, '').slice(0, -3) +
        Math.floor(1000 + Math.random() * 9000) + path.extname(file.originalname)
    );
}

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const mimetyp = file.mimetype
    if (extension === '.webp' || extension === '.jpg' || extension === '.jpeg' || extension === '.png' || extension === '.pdf' || mimetyp === 'image/png' || mimetyp === 'image/jpg' || mimetyp === 'image/jpeg' || mimetyp === 'application/pdf' || mimetyp === 'image/webp') {
        cb(null, true)
    } else {
        cb({ error: 'Only Jpg,png and pdf format is supported' }, false)
    }
}

exports.upload = multer({
    storage: multer.diskStorage({ destination, filename }),
    limit: { fileSize: 1024 * 1024 * 5 },
    fileFilter
});