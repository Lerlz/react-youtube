const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body; // Capture dueDate
    const newTodo = new Todo({ title, priority, dueDate });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { completed, priority, dueDate } = req.body; // Update dueDate
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed, priority, dueDate }, 
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, dueDate, priority, category, note } = req.body;
  try {
    const newTodo = new Todo({
      title,
      dueDate,
      priority,
      category, // Include category
      note,
      user: req.user.id,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
