const mongoose = require('mongoose');
require('dotenv').config();

const photoSchema = new mongoose.Schema({
  url:       { type: String, required: true },
  publicId:  { type: String, required: true },
  caption:   { type: String, default: '' },
  category:  { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now },
});
const Photo = mongoose.model('Photo', photoSchema);

const galleryImages = [
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684243/mishra_dairy_farm/gallery-6.jpg",
    caption: "Irrigation & Greenery",
    category: "Nature",
    publicId: "mishra_dairy_farm/gallery-6"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684241/mishra_dairy_farm/gallery-5.jpg",
    caption: "Innocence & Bonding",
    category: "Bonding",
    publicId: "mishra_dairy_farm/gallery-5"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684240/mishra_dairy_farm/gallery-4.png",
    caption: "Pure, Fresh Milking",
    category: "Fresh Milk",
    publicId: "mishra_dairy_farm/gallery-4"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684239/mishra_dairy_farm/gallery-3.jpg",
    caption: "Healthy & Happy Herd",
    category: "Farm Life",
    publicId: "mishra_dairy_farm/gallery-3"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684238/mishra_dairy_farm/gallery-2.jpg",
    caption: "Gentle Hands, Trusting Calves",
    category: "Bonding",
    publicId: "mishra_dairy_farm/gallery-2"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684236/mishra_dairy_farm/gallery-1.png",
    caption: "Nourishing Our Calves",
    category: "Care",
    publicId: "mishra_dairy_farm/gallery-1"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684244/mishra_dairy_farm/gallery-7.jpg",
    caption: "Our Dedicated Team",
    category: "Farm Life",
    publicId: "mishra_dairy_farm/gallery-7"
  }
];

async function seedGallery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Optional: Clear existing gallery to avoid duplicates during testing
    // await Photo.deleteMany({});
    // console.log('🗑️  Cleared existing photos');

    for (const img of galleryImages) {
      const exists = await Photo.findOne({ url: img.url });
      if (!exists) {
        await new Photo(img).save();
        console.log(`✅ Seeded: ${img.caption}`);
      } else {
        console.log(`⏩ Skipping (exists): ${img.caption}`);
      }
    }

    console.log('🌟 Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedGallery();
