import React from 'react';
import PropTypes from 'prop-types';

export default function TodoCard({ children, handleDeleteTodo, index, handleEditTodo }) {
    return (
        <li className='todoItem'>
            {children}
            <div className='actionsContainer'>
                <button 
                    onClick={() => handleEditTodo(index)} 
                    aria-label="Edit Todo"
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button 
                    onClick={() => handleDeleteTodo(index)} 
                    aria-label="Delete Todo"
                >
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </li>
    );
}

TodoCard.propTypes = {
    children: PropTypes.node.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    handleEditTodo: PropTypes.func.isRequired,
};
