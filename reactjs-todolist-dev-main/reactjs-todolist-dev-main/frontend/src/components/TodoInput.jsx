import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoInput({ handleAddTodos, todoValue, setTodoValue }) {
    const handleAdd = () => {
        handleAddTodos(todoValue);
        setTodoValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    return (
        <header>
            <input
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter todo..."
                aria-label="Enter a new todo"
            />
            <button onClick={handleAdd} aria-label="Add Todo">
                Add
            </button>
        </header>
    );
}

TodoInput.propTypes = {
    handleAddTodos: PropTypes.func.isRequired,
    todoValue: PropTypes.string.isRequired,
    setTodoValue: PropTypes.func.isRequired,
};
