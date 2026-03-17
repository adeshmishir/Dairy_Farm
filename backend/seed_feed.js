const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const productSchema = new mongoose.Schema({
      name: String, description: String, price: String,
      image: String, publicId: String, category: String,
      detailedDescription: mongoose.Schema.Types.Mixed
    });
    const Product = mongoose.model('Product', productSchema);

    const feedProducts = [
      {
        name: "LAL FEEDS MY-9000+ (Milk Booster)",
        description: "Designed for young calves to support their initial growth and development.",
        price: "₹1500 / 50kg bag",
        category: "feed",
        image: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684245/mishra_dairy_farm/feed-red.png",
        detailedDescription: {
          purpose: "Designed for young calves to support their initial growth and development.",
          keyFeatures: [
            "High in essential nutrients, including protein, vitamins and minerals",
            "Easily digestible ingredients to support early digestive health",
            "Promotes healthy weight gain and strong immune function"
          ],
          detailedBenefits: [
            "Provides essential nutrients that promote rapid growth and healthy development in young calves",
            "Formulated with easily digestible ingredients that support the development of the calf's digestive system",
            "Contains vitamins and minerals that boost the immune system, helping calves resist diseases and infections",
            "Optimized for efficient weight gain, ensuring calves reach their target weights faster",
            "Rich in calcium and phosphorus to ensure strong bone development and muscle growth",
            "Facilitates a smoother transition from milk to solid feeds, reducing stress and digestive issues"
          ],
          whyFeedTitle: "Why Feed Calf Starter?",
          whyFeed: "Feeding Calf Starter feed helps young calves grow strong and healthy. This specialized feed gives them the right nutrients, supports their immune system, and helps their stomachs get used to solid food."
        }
      },
      {
        name: "LAL FEEDS MY-5000+ (Super Power)",
        description: "Formulated for growing cattle to ensure continuous development and weight gain.",
        price: "₹1400 / 50kg bag",
        category: "feed",
        image: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684246/mishra_dairy_farm/feed-green.png",
        detailedDescription: {
          purpose: "Formulated for growing cattle to ensure continuous development and weight gain.",
          keyFeatures: [
            "Balanced ratio of proteins, carbohydrates and fats",
            "Fortified with vitamins and minerals to support bone and muscle growth",
            "Optimized for efficient feed conversion and growth rates"
          ],
          detailedBenefits: [
            "Provides balanced nutrients that support continuous and efficient growth in developing cattle",
            "Ensures steady and healthy weight gain, helping cattle reach their growth milestones efficiently",
            "Supports strong muscle and bone growth, crucial for overall health and productivity in cattle",
            "Comprehensive nutrient profile supports the overall health and well-being of the cattle, reducing the risk of health issues"
          ],
          whyFeedTitle: "Why Feed Calf Grower?",
          whyFeed: "Calf Grower feed supports steady growth and development in young cattle. This specialized feed provides the right nutrients for strong muscles and bones, boosts their immune system, and ensures healthy weight gain."
        }
      },
      {
        name: "LAL FEEDS MY-7000+ (High Protein & Fat)",
        description: "Tailored for cattle nearing market weight to maximize muscle mass and overall body condition.",
        price: "₹1600 / 50kg bag",
        category: "feed",
        image: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684247/mishra_dairy_farm/feed-blue.png",
        detailedDescription: {
          purpose: "Tailored for cattle nearing market weight to maximize muscle mass and overall body condition.",
          keyFeatures: [
            "High-energy content to promote rapid weight gain",
            "Enhanced with specific nutrients to improve meat quality",
            "Formulated for efficient feed-to-gain ratios"
          ],
          detailedBenefits: [
            "Promotes rapid weight gain in animals nearing market readiness",
            "Helps achieve desired market weight and condition efficiently",
            "Provides balanced nutrition to support muscle development",
            "Enhances overall carcass quality and meat yield",
            "Contains optimal levels of protein and energy for efficient growth",
            "Supports uniformity in size and maturity of animals"
          ],
          whyFeedTitle: "Why Feed Finisher?",
          whyFeed: "Feeding finisher feed is essential for preparing cattle for market. This special feed is high in energy to promote rapid weight gain and muscle growth, ensuring cattle reach their optimal size efficiently."
        }
      }
    ];

    // Remove existing feed products to avoid duplicates
    await Product.deleteMany({ category: 'feed' });
    console.log('🗑️  Cleared old feed products');

    await Product.insertMany(feedProducts);
    console.log('✅ Seeded 3 feed products successfully!');
    feedProducts.forEach(p => console.log(`   • ${p.name}`));
    process.exit(0);
  })
  .catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
