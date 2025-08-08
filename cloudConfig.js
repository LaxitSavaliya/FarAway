const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const requiredEnv = ['CLOUD_NAME', 'CLOUD_API_KEY', 'CLOUD_API_SECRET'];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing required Cloudinary environment variables: ${missing.join(', ')}`);
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER || 'FarAway_DEV',
    allowed_formats: ['png', 'jpg', 'jpeg'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
    resource_type: 'image',
  },
});

module.exports = {
  cloudinary,
  storage,
};