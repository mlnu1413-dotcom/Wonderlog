require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const { router: authRoutes } = require('./routes/authRoutes');
const { router: postRoutes } = require('./routes/postRoutes');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

if (isProduction) app.set('trust proxy', 1); // hosting platform terminates HTTPS

// The frontend runs on a different port, so allow it to call this API with cookies
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Sessions are stored in MongoDB; the browser only keeps the session id cookie
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  store: isTest ? undefined : MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { httpOnly: true, sameSite: 'lax', secure: isProduction, maxAge: 1000 * 60 * 60 * 24 }
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;

// Only connect to the database and listen when run directly (not in tests)
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      const port = process.env.PORT || 5000;
      app.listen(port, () => console.log(`WanderLog API running on http://localhost:${port}`));
    })
    .catch((err) => console.error('MongoDB connection failed:', err.message));
}
