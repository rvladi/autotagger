const path = require('path');
const multer = require('multer');
const util = require('util');

// maximum number of files to upload
const MAX_NUMBER_OF_FILES = 4;

// only images in JPEG or PNG format are supported
const MIME_TYPES = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/../uploads`));
    },
    filename: (req, file, callback) => {
        if (MIME_TYPES.indexOf(file.mimetype) === -1) {
            const err = `${file.originalname} is not in a supported format. Select images in JPEG or PNG format.`;
            callback(err, null);
        } else {
            // build a unique filename based on the original name
            const filename = `${Date.now()}-${file.originalname}`;
            callback(null, filename);
        }
    }
});

const uploadFilesMulter = multer({storage: storage}).array('multi-files', MAX_NUMBER_OF_FILES);
const uploadFiles = util.promisify(uploadFilesMulter);
module.exports = uploadFiles;
