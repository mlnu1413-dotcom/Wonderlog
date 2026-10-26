const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const requireLogin = require('../middleware/authMiddleware');

const router = express.Router();

// Returns a list of error messages (empty list = valid)
function validatePost({ title, destination, description, imageUrl } = {}) {
  const errors = [];
  if (!title || !title.trim()) errors.push('Title is required');
  if (!destination || !destination.trim()) errors.push('Destination is required');
  if (!description || !description.trim()) errors.push('Description is required');
  let urlOk = false;
  try {
    urlOk = ['http:', 'https:'].includes(new URL(imageUrl).protocol);
  } catch (e) {}
  if (!urlOk) errors.push('Image URL must start with http:// or https://');
  return errors;
}

router.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name');
  res.json(posts);
});

router.get('/posts/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Post not found' });
  const post = await Post.findById(req.params.id).populate('author', 'name');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

router.post('/posts', requireLogin, async (req, res) => {
  const errors = validatePost(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const { title, destination, description, imageUrl } = req.body;
  // author always comes from the session, never from the request body
  const post = await Post.create({ title, destination, description, imageUrl, author: req.session.userId });
  res.status(201).json(post);
});

// Only the logged-in user's own posts
router.get('/my-posts', requireLogin, async (req, res) => {
  const posts = await Post.find({ author: req.session.userId }).sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = { router, validatePost };
