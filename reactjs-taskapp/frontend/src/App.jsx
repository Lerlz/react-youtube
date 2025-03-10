import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
    return (
        <div>
            <h1>Task Manager</h1>
            <TodoInput />
            <TodoList />
        </div>
    );
}

export default App;
