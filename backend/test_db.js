const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('Testing connection to:', uri);

mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS');
    process.exit(0);
  })
  .catch((err) => {
    console.error('FAILURE:', err.message);
    process.exit(1);
  });
