const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: String, required: true },
  image:       { type: String, default: '' },
  publicId:    { type: String, default: '' },
  category:    { type: String, default: 'milk' },
  detailedDescription: { type: String, default: '' }
});
const Product = mongoose.model('Product', productSchema);

const milkProducts = [
  {
    name: "Pure Cow Milk",
    description: "Farm fresh A2 Cow milk, rich in nutrients and naturally sweet.",
    price: "₹60 / Litre",
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "milk",
    detailedDescription: "Our A2 Cow milk is sourced from local breeds known for high-quality protein. We maintain strict hygiene at every step of milking. No hormones, no antibiotics. Delivered within 4 hours of milking."
  },
  {
    name: "Fresh Buffalo Milk",
    description: "Creamy, high-fat Buffalo milk perfect for delicious curd and paneer.",
    price: "₹75 / Litre",
    image: "https://images.pexels.com/photos/1598160/pexels-photo-1598160.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "milk",
    detailedDescription: "Buffalo milk is known for its richness and thick cream. Our buffaloes are fed high-quality green fodder to ensure healthy production. It's the best choice for making ghee and sweets at home."
  },
  {
    name: "Full Cream Milk",
    description: "Standardized high-energy milk for the complete growth of your children.",
    price: "₹65 / Litre",
    image: "https://images.pexels.com/photos/244355/pexels-photo-244355.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "milk",
    detailedDescription: "A balanced blend of dairy goodness. Our Full Cream Milk goes through minimum processing to preserve its natural enzymes and vitamins. It provides 6% fat and 9% SNF as per standards."
  }
];

async function seedMilk() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Optional: Only remove old milk products to replace them
    // await Product.deleteMany({ category: 'milk' });
    // console.log('🗑️  Cleared old milk products');

    for (const prod of milkProducts) {
      const exists = await Product.findOne({ name: prod.name });
      if (!exists) {
        await new Product(prod).save();
        console.log(`✅ Seeded: ${prod.name}`);
      } else {
        console.log(`⏩ Skipping (exists): ${prod.name}`);
      }
    }

    console.log('🌟 Seeding milk products completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedMilk();
