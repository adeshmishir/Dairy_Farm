const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Readable } = require('stream');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Mishra Dairy Farm" <${process.env.EMAIL_USER}>`,
      to, subject, html
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Email error:`, err);
  }
};

const JWT_SECRET = 'milkies';

// Cloudinary v2 Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer — store in memory, then push to Cloudinary manually
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Helper: upload a Buffer to Cloudinary, returns { url, publicId }
const uploadToCloudinary = (buffer, folder = 'mishra_dairy') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image', transformation: [{ width: 1200, crop: 'limit' }] },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    Readable.from(buffer).pipe(stream);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB (milkies)'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// ── Auth Middleware ───────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId  = decoded?.id;
    req.isAdmin = decoded?.isAdmin;
    next();
  } catch {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// ── Schemas ───────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: false },
  isAdmin:  { type: Boolean, default: false },
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: String, required: true },
  image:       { type: String, default: '' },
  publicId:    { type: String, default: '' },
  category:    { type: String, default: 'milk' },
});
const Product = mongoose.model('Product', productSchema);

const photoSchema = new mongoose.Schema({
  url:       { type: String, required: true },
  publicId:  { type: String, required: true },
  caption:   { type: String, default: '' },
  category:  { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now },
});
const Photo = mongoose.model('Photo', photoSchema);

const reviewSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date:    {
    type: String,
    default: () => new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
  },
});
const Review = mongoose.model('Review', reviewSchema);

// ── Auth Routes ───────────────────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const isAdmin = email === 'mishradairyfarm4@gmail.com';
    const user = await new User({ name, email, password: hashedPassword, isAdmin }).save();
    const token = jwt.sign({ id: user._id, email, isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    
    // Welcome Email
    sendMail(email, 'Welcome to Mishra Dairy Farm! 🥛', `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 20px;">
        <h2 style="color: #166534;">Namaste ${name}! 🙏</h2>
        <p>Thank you for joining <b>Mishra Dairy Farm</b>. We are thrilled to have you as part of our community!</p>
        <p>At our farm, we prioritize purity and care. You can now browse our fresh dairy products and share your valuable reviews with us.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          <b>Mishra Dairy Farm</b><br>
          Freshness from our farm to your home.<br>
          <i>Contact: +91 8953280445</i>
        </p>
      </div>
    `);

    res.status(201).json({ token, user: { name, email, isAdmin } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      const isAdmin = email === 'mishradairyfarm4@gmail.com';
      user = await new User({ name, email, isAdmin }).save();
      
      // Welcome Email for new Google Users
      sendMail(email, 'Welcome to Mishra Dairy Farm! 🥛', `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 20px;">
          <h2 style="color: #166534;">Namaste ${name}! 🙏</h2>
          <p>Thank you for joining <b>Mishra Dairy Farm</b> via Google. We are thrilled to have you!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            <b>Mishra Dairy Farm</b><br>
            Contact: +91 8953280445
          </p>
        </div>
      `);
    }

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Google login failed' });
  }
});

// ── Products ──────────────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try { res.json(await Product.find()); }
  catch { res.status(500).json({ message: 'Error fetching products' }); }
});

app.post('/api/products', auth, upload.single('image'), async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    const { name, description, price, category } = req.body;
    let image = '', publicId = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'mishra_dairy/products');
      image = result.url; publicId = result.publicId;
    }
    const product = await new Product({ name, description, price, image, publicId, category }).save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Error creating product' });
  }
});

app.delete('/api/products/:id', auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    if (product.publicId) await cloudinary.uploader.destroy(product.publicId);
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

app.put('/api/products/:id', auth, upload.single('image'), async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    const { name, description, price, category } = req.body;
    let updateData = { name, description, price, category };
    if (req.file) {
      const product = await Product.findById(req.params.id);
      if (product && product.publicId) await cloudinary.uploader.destroy(product.publicId);
      const result = await uploadToCloudinary(req.file.buffer, 'mishra_dairy/products');
      updateData.image = result.url;
      updateData.publicId = result.publicId;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// ── Photos (Gallery) ──────────────────────────────────────────────────────────
app.get('/api/photos', async (req, res) => {
  try { res.json(await Photo.find().sort({ createdAt: -1 })); }
  catch { res.status(500).json({ message: 'Error fetching photos' }); }
});

app.post('/api/photos', auth, upload.single('photo'), async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { url, publicId } = await uploadToCloudinary(req.file.buffer, 'mishra_dairy/gallery');
    const photo = await new Photo({ 
      url, 
      publicId, 
      caption: req.body.caption || '',
      category: req.body.category || 'General'
    }).save();
    res.status(201).json(photo);
  } catch (err) {
    console.error('Photo upload error:', err);
    res.status(500).json({ message: 'Photo upload failed' });
  }
});

app.delete('/api/photos/:id', auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Not found' });
    await cloudinary.uploader.destroy(photo.publicId);
    await photo.deleteOne();
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    console.error('Delete photo error:', err);
    res.status(500).json({ message: 'Error deleting photo' });
  }
});

app.put('/api/photos/:id', auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    const { caption, category } = req.body;
    const photo = await Photo.findByIdAndUpdate(req.params.id, { caption, category }, { new: true });
    res.json(photo);
  } catch (err) {
    console.error('Update photo error:', err);
    res.status(500).json({ message: 'Error updating photo' });
  }
});

// ── Reviews ───────────────────────────────────────────────────────────────────
app.get('/api/reviews', async (req, res) => {
  try { res.json(await Review.find().sort({ _id: -1 })); }
  catch { res.status(500).json({ message: 'Error fetching reviews' }); }
});

app.post('/api/reviews', auth, async (req, res) => {
  try {
    const review = await new Review(req.body).save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ message: 'Error saving review' });
  }
});

app.delete('/api/reviews/:id', auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch { res.status(500).json({ message: 'Error deleting review' }); }
});

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.send('Mishra Dairy Farm API ✅'));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server on port ${PORT}`));
