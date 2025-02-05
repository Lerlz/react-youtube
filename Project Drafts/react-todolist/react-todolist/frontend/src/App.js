import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Auth from './Auth';
import { Link } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newNote, setNewNote] = useState(''); // New note field
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('priority'); // Sorting state
  const [newCategory, setNewCategory] = useState('Personal'); // New category state

  const fetchTodos = useCallback(async () => {
    const res = await axios.get('http://localhost:5000/api/todos', {
      headers: { Authorization: token },
    });
    setTodos(res.data);
  }, [token]);

  // const userRoutes = require('./routes/user');
  // app.use('/api/user', userRoutes);
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchTodos();
    }
  }, [token, fetchTodos]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const res = await axios.post(
      'http://localhost:5000/api/todos',
      { title: newTodo, priority: newPriority, dueDate: newDueDate, category: newCategory, note: newNote }, // Pass category
      { headers: { Authorization: token } }
    );
    setTodos([...todos, res.data]);
    setNewTodo('');
    setNewPriority('medium');
    setNewDueDate('');
    setNewCategory('Personal');
    setNewNote('');
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, { completed }, {
      headers: { Authorization: token },
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: token },
    });
    fetchTodos();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
    return true;
  });

  const priorityClasses = {
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-green-500 text-white',
  };

  const isOverdue = useCallback((dueDate) => {
    return new Date(dueDate) < new Date() && !filteredTodos.completed;
  }, [filteredTodos]);

  function isNearDue(dueDate) {
    const dueTime = new Date(dueDate).getTime();
    const currentTime = new Date().getTime();
    return dueTime - currentTime <= 86400000 && dueTime > currentTime; // Less than 24 hours remaining
  }

  const showNotification = useCallback((todo) => {
      if (Notification.permission === 'granted') {
        const notification = new Notification('Task Reminder', {
          body: `${todo.title} is ${isOverdue(todo.dueDate) ? 'overdue' : 'due soon'}`,
          icon: '/path-to-your-icon.png', // Optional icon for the notification
        });
        notification.onclick = () => {
          window.focus();
        };
      }
    }, [isOverdue]);
  
    useEffect(() => {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
  
      const intervalId = setInterval(() => {
        todos.forEach(todo => {
          if (isOverdue(todo.dueDate) || isNearDue(todo.dueDate)) {
            showNotification(todo);
          }
        });
      }, 10000); // Check every 10 seconds
  
      return () => clearInterval(intervalId);
    }, [todos, isOverdue, showNotification]);

  // Sort the todos based on the selected criteria
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'priority') {
      return a.priority.localeCompare(b.priority);
    } else if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  if (!token) return <Auth setToken={setToken} />;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex items-center justify-center p-6`}>
      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">React To-Do List</h1>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
          
        {/* Inside the return statement of App.js */}
          <Link to="/profile" className="text-blue-500 hover:text-blue-700">
            View Profile
          </Link>

          {/* Inside the return statement, where the form is: */}
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Others">Others</option>
            </select>
        </div>


        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Category Filter Dropdown */}
        <div className="mb-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
          </select>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note"
            className="border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {sortedTodos.map((todo) => (
            <li key={todo._id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded shadow-sm">
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo._id, todo.completed)}
                  className="mr-2"
                />
                <span className={todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
                  {todo.title}
                </span>
              </div>
              <span className={`px-2 py-1 rounded ${priorityClasses[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              {todo.dueDate && (
                <span
                  className={`px-2 py-1 rounded ${isOverdue(todo.dueDate) ? 'bg-red-700 text-white' : 'bg-blue-500 text-white'}`}
                >
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
              {todo.note && (
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  Note: {todo.note}
                </span>
              )}
              <button
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
