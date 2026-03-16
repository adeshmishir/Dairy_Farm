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

const mappedFiles = [
  // First Prompt
  { file: 'media__1773682367495.png', id: 'founder' },
  { file: 'media__1773682414338.png', id: 'gallery-1' },
  { file: 'media__1773682421743.jpg', id: 'gallery-2' },
  { file: 'media__1773682430097.jpg', id: 'gallery-3' },
  { file: 'media__1773682436756.png', id: 'gallery-4' },
  // Second Prompt
  { file: 'media__1773682494246.jpg', id: 'gallery-5' },
  { file: 'media__1773682510946.jpg', id: 'gallery-6' },
  { file: 'media__1773682530304.jpg', id: 'gallery-7' },
  // Third Prompt
  { file: 'media__1773682703364.png', id: 'feed-red' },
  { file: 'media__1773682714379.png', id: 'feed-green' },
  { file: 'media__1773682725750.png', id: 'feed-blue' },
];

async function uploadImages() {
  try {
    console.log(`Starting mapped uploads to Cloudinary...`);
    
    for (const item of mappedFiles) {
      const filePath = path.join(mediaDir, item.file);
      if (!fs.existsSync(filePath)) {
        console.error(`Skipping missing file: ${item.file}`);
        continue;
      }
      
      console.log(`Uploading ${item.file} as mishra_dairy_farm/${item.id}...`);
      
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'mishra_dairy_farm',
        public_id: item.id,
        overwrite: true
      });
      
      console.log(`✅ Uploaded: ${item.id}`);
      console.log(`URL: ${result.secure_url}`);
    }
    
    console.log('All uploads finished successfully!');
  } catch (error) {
    console.error('Error uploading images:', error);
  }
}

uploadImages();
