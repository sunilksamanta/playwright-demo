import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Playwright Demo App</h1>
        
        {/* Counter Section */}
        <div className="counter-section">
          <h2>Counter</h2>
          <button data-testid="counter-button" onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>
        </div>

        {/* Name Form Section */}
        <div className="name-section">
          <h2>Name Form</h2>
          <input
            data-testid="name-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && <p data-testid="greeting">Hello, {name}!</p>}
        </div>

        {/* Todo List Section */}
        <div className="todo-section">
          <h2>Todo List</h2>
          <div className="todo-input">
            <input
              data-testid="todo-input"
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button data-testid="add-todo-button" onClick={addTodo}>
              Add Todo
            </button>
          </div>
          
          <ul data-testid="todo-list" className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span 
                  onClick={() => toggleTodo(todo.id)}
                  style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {todo.text}
                </span>
                <button 
                  data-testid={`delete-todo-${todo.id}`}
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          
          {todos.length > 0 && (
            <p data-testid="todo-count">
              Total todos: {todos.length} | 
              Completed: {todos.filter(t => t.completed).length}
            </p>
          )}
        </div>
      </header>
    </div>
  )
}

export default App