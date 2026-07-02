/**
 * Quick MongoDB Connection Test
 * Run with: node test-connection.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cafe';
  
  console.log('🔌 Testing MongoDB connection...');
  console.log('📍 URI:', uri);
  
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    await mongoose.disconnect();
    console.log('👋 Disconnected. Connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Docker: docker run --name kiln-mongo -p 27017:27017 -d mongo:latest');
    console.log('3. Or install MongoDB locally from https://www.mongodb.com/try/download/community');
    console.log('4. Or use MongoDB Atlas (cloud) from https://www.mongodb.com/cloud/atlas');
    process.exit(1);
  }
}

testConnection();
