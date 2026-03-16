const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mediaDir = 'C:\\Users\\mishr\\.gemini\\antigravity\\brain\\f491f2d4-52db-4aeb-889d-8c9a0cb0e9c8';

async function uploadImages() {
  try {
    const files = fs.readdirSync(mediaDir).filter(file => file.startsWith('media__') && (file.endsWith('.jpg') || file.endsWith('.png')));
    
    console.log(`Found ${files.length} images to upload...`);
    
    for (const file of files) {
      const filePath = path.join(mediaDir, file);
      console.log(`Uploading ${file}...`);
      
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'mishra_dairy_farm'
      });
      
      console.log(`✅ Uploaded: ${file}`);
      console.log(`URL: ${result.secure_url}`);
      console.log('-----------------------------------');
    }
    
    console.log('All uploads finished successfully!');
  } catch (error) {
    console.error('Error uploading images:', error);
  }
}

uploadImages();
