
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const dailyFormRoutes = require("./routes/dailyForm");
const monthlyRoutes = require("./routes/monthlyRoutes"); 
const formRoutes = require("./routes/forms");


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/daily-form", dailyFormRoutes);
app.use("/api/monthly", monthlyRoutes);
app.use("/api", formRoutes);
// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EarthWise API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
