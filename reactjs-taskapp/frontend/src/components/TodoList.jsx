import { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const { data } = await axios.get('http://localhost:5000/api/tasks');
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            {tasks.map((task) => (
                <div key={task._id}>
                    {task.title}
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
