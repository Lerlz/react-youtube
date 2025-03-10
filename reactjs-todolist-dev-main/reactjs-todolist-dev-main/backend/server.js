// Load environment variables from .env file
require("dotenv").config({ path: './.env' }); ;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Log the Mongo URI to ensure it's loaded correctly
console.log("Mongo URI:", process.env.MONGODB_URI);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process with a failure code
  });

const todoRoutes = require("./routes/todoRoutes");

// Use routes
app.use("/api", todoRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Log all environment variables (for debugging)
console.log(process.env);

// Mongo URI check
console.log("Mongo URI:", process.env.MONGODB_URI);


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // Mongoose Schema & Model
// const TodoSchema = new mongoose.Schema({
//   task: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// });

// const Todo = mongoose.model("Todo", TodoSchema);

// // Routes
// app.get("/todos", async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// app.post("/todos", async (req, res) => {
//   const { task } = req.body;
//   const newTodo = new Todo({ task });
//   await newTodo.save();
//   res.json(newTodo);
// });

// app.put("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   const { completed } = req.body;
//   const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
//   res.json(updatedTodo);
// });

// app.delete("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   await Todo.findByIdAndDelete(id);
//   res.json({ message: "Todo deleted" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
