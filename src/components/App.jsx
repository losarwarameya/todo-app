import { useState, useEffect } from "react";

import Task from "./Task";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    console.log(savedTodos);
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(localStorage.getItem("todos"));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, e.target[0].value]);
    setInput("");
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((item, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="list-item">
              <Task task={todo} />
              <button className="close-btn" onClick={() => handleDelete(index)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
