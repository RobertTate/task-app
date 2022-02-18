const multer = require('multer');

/**
 * The Multer Config for Uploading the Avatar Image of a User.
 */
const uploadAvatarConfig = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webP)$/)) {
      return cb(new Error('Please upload an image using one of the accepted image formats.'));
    };

    cb(undefined, true);
  }
});

module.exports = uploadAvatarConfig;
