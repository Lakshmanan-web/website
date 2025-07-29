const mongoose = require('mongoose');
require('dotenv').config();

// Define the PhoneCase schema
const phoneCaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PhoneCase = mongoose.model('PhoneCase', phoneCaseSchema);

// Sample phone cases data
const sampleCases = [
  {
    name: 'iPhone 15 Pro Case',
    color: 'Black',
    price: 29.99,
    image: '/photo/black.jpeg',
    description: 'Premium protective case for iPhone 15 Pro with sleek black design'
  },
  {
    name: 'iPhone 15 Pro Case',
    color: 'Blue',
    price: 29.99,
    image: '/photo/blue.jpeg',
    description: 'Premium protective case for iPhone 15 Pro in elegant blue'
  },
  {
    name: 'iPhone 15 Pro Case',
    color: 'Red',
    price: 29.99,
    image: '/photo/red.jpeg',
    description: 'Premium protective case for iPhone 15 Pro in vibrant red'
  },
  {
    name: 'Samsung Galaxy S24 Case',
    color: 'Black',
    price: 24.99,
    image: '/photo/black.jpeg',
    description: 'Durable protective case for Samsung Galaxy S24'
  },
  {
    name: 'Google Pixel 8 Case',
    color: 'Blue',
    price: 19.99,
    image: '/photo/blue.jpeg',
    description: 'Lightweight protective case for Google Pixel 8'
  }
];

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await PhoneCase.deleteMany({});
    console.log('🗑️ Cleared existing phone cases');

    // Insert sample data
    const insertedCases = await PhoneCase.insertMany(sampleCases);
    console.log(`✅ Inserted ${insertedCases.length} phone cases`);

    // Display inserted cases
    console.log('\n📱 Inserted Phone Cases:');
    insertedCases.forEach(case_ => {
      console.log(`- ${case_.name} (${case_.color}) - ₹${case_.price}`);
    });

    console.log('\n🎉 Database populated successfully!');
  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

populateDatabase(); 