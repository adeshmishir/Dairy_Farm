const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const ADMIN_EMAIL = 'mishradairyfarm4@gmail.com';
const NEW_PASSWORD = 'Admin@1234'; // Change this to your preferred password

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

async function resetOrCreateAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 12);

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    // Update existing user - set new password AND ensure isAdmin is true
    existing.password = hashedPassword;
    existing.isAdmin = true;
    await existing.save();
    console.log(`✅ Admin user updated!`);
  } else {
    // Create brand new admin user
    const admin = new User({
      name: 'Mishra Dairy Farm Admin',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true
    });
    await admin.save();
    console.log(`✅ Admin user created!`);
  }

  console.log(`\n🔐 Admin Login Credentials:`);
  console.log(`   Email   : ${ADMIN_EMAIL}`);
  console.log(`   Password: ${NEW_PASSWORD}`);
  console.log(`\n👉 Now go to http://localhost:5173/auth and sign in!\n`);

  process.exit(0);
}

resetOrCreateAdmin().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
