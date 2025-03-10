import React from 'react';
import PropTypes from 'prop-types';
import TodoCard from './TodoCard';

export default function TodoList({ todos, handleDeleteTodo, handleEditTodo }) {
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todo.id || todoIndex} // If `todo.id` is available, use it
                        index={todoIndex}
                        handleDeleteTodo={handleDeleteTodo}
                        handleEditTodo={handleEditTodo}
                    >
                        <p>{todo.text}</p> {/* Assuming `todo` is an object with a `text` property */}
                    </TodoCard>
                );
            })}
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,  // If `id` exists on todo
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleEditTodo: PropTypes.func.isRequired,
};
