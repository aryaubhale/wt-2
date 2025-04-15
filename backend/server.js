require('dotenv').config(); // ✅ Load .env before anything else

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // ✅ For serving frontend files
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ DB connection
connectDB();

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ API routes
app.use('/api/expenses', expenseRoutes);

// ✅ Fallback for other GET requests (e.g., refresh on index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
