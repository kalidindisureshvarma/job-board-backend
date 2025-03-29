const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const setupWebSocket = require('./sockets/jobSocket');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const limiter = require('./middleware/rateLimit');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

setupWebSocket(server);

module.exports = { server, app };
