const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

require("dotenv").config();
const router = express.Router();


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Simplified multer memory storage setup
const upload = multer({ storage: multer.memoryStorage() });

// Helper function for streaming upload
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto',folder:"buyIt" }, // Auto-detect file type
      (error, result) => error ? reject(error) : resolve(result)
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Simplified route handler
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    // Validate file size (e.g., 5MB max)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'File size exceeds 5MB limit' });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    
    res.json({ 
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed',});
  }
});

module.exports = router;