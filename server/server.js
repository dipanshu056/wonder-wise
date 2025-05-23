console.log('Starting server.js');
// ... rest of the code
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('wonder-wise API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));