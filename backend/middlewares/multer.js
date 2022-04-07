const multer = require('multer');

//Types of files to handle and how//
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png',
    'images.gif': 'gif',
};

//Tell how to handle images files and where to stock them//
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './upload')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.replace(/\.[^/.]+$/, "")
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    },
});

module.exports = multer({storage: storage}).single('file');