const multer = require('multer');
const uniqid = require('uniqid'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, uniqid() + '_' + file.originalname)
    }
});

const upload = multer({ storage: storage }); 

module.exports = upload;