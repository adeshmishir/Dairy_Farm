const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function getImages() {
  try {
    const result = await cloudinary.search
      .expression('folder:mishra_dairy_farm')
      .sort_by('created_at','desc')
      .max_results(30)
      .execute();

    const urls = result.resources.map(file => file.secure_url);
    console.log(JSON.stringify(urls, null, 2));
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

getImages();
