import { useState } from 'react';
import axios from 'axios';

const TodoInput = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");

    const addTask = async () => {
        if (!title) return;
        await axios.post('http://localhost:5000/api/tasks', { title });
        setTitle("");
        fetchTasks();
    };

    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default TodoInput;
