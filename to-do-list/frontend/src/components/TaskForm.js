import React, { useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = ({ onSubmit }) => {
    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        priority: "Medium",
        dueDate: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!taskData.name.trim()) newErrors.name = "Task name is required!";
        if (!taskData.description.trim())
            newErrors.description = "Task description is required!";
        if (!taskData.dueDate) newErrors.dueDate = "Due date is required!";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            if (onSubmit && typeof onSubmit === "function") {
                onSubmit(taskData); // Pass the new task to MainPage
            }
            // console.log('taskData.name', taskData.name);
            // alert(`${taskData.name} has been created successfully!`);
            setTaskData({
                name: "",
                description: "",
                priority: "Medium",
                dueDate: "",
            });
            setErrors({});
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            {/* Task Name */}
            <div className="form-group">
                <label htmlFor="name">Task Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={taskData.name}
                    onChange={handleChange}
                    placeholder="Enter task name"
                />
                {errors.name && (
                    <span className="error-message">{errors.name}</span>
                )}
            </div>

            {/* Task Description */}
            <div className="form-group">
                <label htmlFor="description">Task Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows="3"
                ></textarea>
                {errors.description && (
                    <span className="error-message">{errors.description}</span>
                )}
            </div>

            {/* Task Priority Level */}
            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Due Date for the Task */}
            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                />
                {errors.dueDate && (
                    <span className="error-message">{errors.dueDate}</span>
                )}
            </div>

            <button type="submit" className="submit-button">
                Create Task
            </button>
        </form>
    );
};

export default TaskForm;