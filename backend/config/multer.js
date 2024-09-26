const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure the Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowedFormats: ['jpeg', 'png', 'jpg'], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional image transformations
  },
});

// Set up multer to use Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
