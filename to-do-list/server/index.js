import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const database_name = 'mytasksdatabase';

mongoose
    .connect("mongodb://localhost:27017/" + database_name)
    .then(() => {
        console.log("Connected to MongoDB " + database_name);
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        dueDate: {
            type: Date,
        },
    },
    { timestamps: true } // Update createdAt and updatedAt automatically
);

const Task = mongoose.model("task", taskSchema);

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        // console.log("tasks:", tasks);
        console.log(`[GET/tasks] Retrieved ${tasks.length} tasks.`);
        res.json(tasks);
    } catch (err) {
        console.error(`[GET/tasks] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        if (!req.body.title) {
            console.warn(`[POST/tasks] Validation failed: Title is required.`);
            res.status(400).json({ error: "Title is required" });
        }

        const newTask = new Task(req.body);
        await newTask.save();

        console.log(`[POST/tasks] Task created successfully with ID: ${newTask._id}`);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body);

        if (!updatedTask) {
            console.warn(`[PUT/tasks/${id}] Task not found.`);
            res.status(404).json({ error: "Task cannot be found!" });
        }

        console.log(`[PUT/tasks/${id}] Task updated successfully.`);
        res.json({
            message: "Task has been updated successfully!",
            updatedTask,
        });
    } catch (err) {
        // console.error(err);
        console.error(`[PUT/tasks/${req.params.id}] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            console.warn(`[DELETE/tasks/${id}] Task not found.`);
            res.status(404).json({ error: "Task cannot be found!" });
        }

        console.log(`[DELETE/tasks/${id}] Task deleted successfully.`);
        res.json({
            message: "Task has been deleted successfully!",
            deletedTask,
        });
    } catch (err) {
        console.error(`[DELETE/tasks/${req.params.id}] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () =>
    console.log("Server is running at http://localhost:3000")
);