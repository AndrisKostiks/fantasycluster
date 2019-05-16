const multer = require('multer');
const path = require('path');

// STORAGE ENGINE
const Storage = multer.diskStorage({
    destination: './assets/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '=' + Date.now() + path.extname(file.originalname));
    }
});

// INIT UPLOAD VARIABLE
const upload = multer({
    storage: Storage
}).single('image');

module.exports = upload;
