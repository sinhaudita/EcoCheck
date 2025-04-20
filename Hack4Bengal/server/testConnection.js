
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');

// Load environment variables
dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/earthwise';
const apiServerPort = process.env.PORT || 5000;

console.log('=== SERVER CONNECTION TEST ===');
console.log('Testing MongoDB connection and API server availability');
console.log('MongoDB URI:', mongoUri);

// Test MongoDB connection
async function testMongoConnection() {
  console.log('\n[MongoDB Connection Test]');
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connection successful!');
    console.log(`Connected to: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error(`Error: ${error.message}`);
    console.error('\nPossible solutions:');
    console.error('1. Make sure MongoDB is running on your system');
    console.error('2. Check that the connection string in .env is correct');
    console.error('3. Verify network connectivity to the MongoDB server');
    return false;
  } finally {
    // Close the connection regardless of outcome
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

// Test API server connection
function testApiServer() {
  console.log('\n[API Server Connection Test]');
  console.log(`Checking if server is running on port ${apiServerPort}...`);
  
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: apiServerPort,
      path: '/',
      method: 'GET',
      timeout: 3000
    }, (res) => {
      console.log(`✅ API server is running (status code: ${res.statusCode})`);
      resolve(true);
    });

    req.on('error', (error) => {
      console.error('❌ API server connection failed!');
      console.error(`Error: ${error.message}`);
      console.error('\nPossible solutions:');
      console.error('1. Make sure you started the server with "npm start" or "npm run dev"');
      console.error('2. Check that the server is running on the expected port');
      console.error(`3. Verify no other service is using port ${apiServerPort}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.error('❌ API server connection timed out!');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Run both tests
async function runTests() {
  console.log('\nStarting connection tests...');
  console.log('--------------------------------');
  
  const mongoResult = await testMongoConnection();
  const apiResult = await testApiServer();

  console.log('\n=== SUMMARY ===');
  console.log(`MongoDB Connection: ${mongoResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`API Server:         ${apiResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log('\nIf any test failed, please fix the issue before trying to use the application.');
  
  if (!mongoResult || !apiResult) {
    console.log('\nFor authentication to work properly, both tests must pass!');
  }
}

runTests();
