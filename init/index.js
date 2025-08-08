const mongoose = require('mongoose');
const listings = require('./data.js');
const Listing = require('../models/listing');
require('dotenv').config({ path: '../.env' });

const dbUrl = process.env.DB_URL;

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');

    await Listing.deleteMany({});
    console.log('Deleted old listings');

    const listingsWithOwner = listings.map((obj) => ({ ...obj, owner: '688c8dc5e5f937c00b3d24ea' }));

    await Listing.insertMany(listingsWithOwner);
    console.log('Data was initialized');

  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();