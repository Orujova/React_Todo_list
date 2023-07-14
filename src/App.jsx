import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load todos from local storage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      if (editIndex === null) {
        const updatedTodos = [...todos, newTodo.trim()];
        setTodos(updatedTodos);
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo.trim();
        setTodos(updatedTodos);
        setEditIndex(null);
      }
      setNewTodo("");
    }
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleTodoEdit = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleNewTodoSubmit}>
        <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <button className="submit" type="submit">
          {editIndex === null ? "Add" : "Save"}
        </button>
      </form>
      {todos.length === 0 ? (
        <h2>Empty</h2>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={newTodo}
                  onChange={handleNewTodoChange}
                />
              ) : (
                <p>{todo}</p>
              )}
              <div>
                {editIndex === index ? null : (
                  <button onClick={() => handleTodoEdit(index)} className="edit">
                    Edit
                  </button>
                )}
                <button onClick={() => handleTodoDelete(index)} className="delete">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
