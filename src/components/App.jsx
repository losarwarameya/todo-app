import { useState, useRef, useEffect } from "react";
import Task from "./Task";
import EditTask from "./EditTask";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([e.target[0].value,...todos]);
    setInput("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleEditTask = (index, newValue) => {
    const updatedTodos = todos.map((item, i) => {
      if (i === index) {
        return newValue;
      }
      return item;
    });
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((item, i) => i !== index);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    inputRef.current.focus();
  },[])

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {editIndex !== null && (
          <EditTask
            task={todos[editIndex]}
            onSave={(newValue) => handleEditTask(editIndex, newValue)}
            onCancel={() => setEditIndex(null)}
          />
        )}
      </div>
      <div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="list-item">
              <Task
                task={todo}
                index={index}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
