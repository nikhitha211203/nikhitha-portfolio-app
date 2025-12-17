const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

async function createUser() {
  const email = process.env.TEST_USER_EMAIL || 'test@local.test';
  const username = process.env.TEST_USER_NAME || 'testadmin';
  const password = process.env.TEST_USER_PASSWORD || 'TestPass123!';

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set in server/.env. Cannot connect to DB.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, { autoIndex: false });

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('User already exists:', email);
    console.log('Updating password...');
    const salt = await bcrypt.genSalt(10);
    existing.password = await bcrypt.hash(password, salt);
    await existing.save();
    console.log('Password updated successfully.');
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({ username, email, password: hashed });
  await user.save();

  console.log('Created user:');
  console.log(`  username: ${username}`);
  console.log(`  email: ${email}`);
  console.log(`  password: ${password}`);
  process.exit(0);
}

createUser().catch((err) => {
  console.error('Error creating user:', err);
  process.exit(1);
});
