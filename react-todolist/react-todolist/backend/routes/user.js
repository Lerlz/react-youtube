const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to protect the route
const authMiddleware = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
