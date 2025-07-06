const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/forms', formRoutes);

// Auth routes (no token required)
app.use('/api/auth', require('./routes/authRoutes'));

// Admin routes (with admin middleware)
app.use('/api/admin', authMiddleware, adminMiddleware, require('./routes/adminRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('VNEST Incubation Application API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});