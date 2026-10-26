const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns a list of error messages (empty list = valid)
function validateSignup({ name, email, password, confirmPassword } = {}) {
  const errors = [];
  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !emailPattern.test(email)) errors.push('A valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  if (password !== confirmPassword) errors.push('Passwords do not match');
  return errors;
}

router.post('/signup', async (req, res) => {
  const errors = validateSignup(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const email = req.body.email.toLowerCase().trim();
    if (await User.findOne({ email })) return res.status(409).json({ errors: ['Email is already registered'] });
    const hash = await bcrypt.hash(req.body.password, 10); // never store the plain password
    await User.create({ name: req.body.name, email, password: hash });
    res.status(201).json({ message: 'Account created' });
  } catch (err) {
    res.status(500).json({ errors: ['Server error'] });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = typeof email === 'string' && typeof password === 'string'
      ? await User.findOne({ email: email.toLowerCase().trim() }) : null;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ errors: ['Invalid email or password'] });
    }
    // New session id after login prevents session fixation
    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ errors: ['Server error'] });
      req.session.userId = user._id.toString();
      req.session.userName = user.name;
      req.session.save(() => res.json({ message: 'Logged in', user: { name: user.name, email: user.email } }));
    });
  } catch (err) {
    res.status(500).json({ errors: ['Server error'] });
  }
});

// Destroys the session and clears the cookie
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

// Tells the frontend who is logged in (used by the navbar)
router.get('/me', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  res.json({ name: req.session.userName });
});

module.exports = { router, validateSignup };
