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
    const reg = /\s+/g;
    if (input !== "" && input.replace(reg, "")) {
      const updatedTodos = [e.target[0].value.replace(reg, ""), ...todos];
      setTodos(updatedTodos);
      setInput("");
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const handleEdit = (index) => {
    if (editIndex !== null && editIndex !== index) {
      handleEditTask(index, todos[index]);
    }
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
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((item, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="top-container">
            <h1 className="top-header">To Do List</h1>
            <form onSubmit={handleSubmit} className="add-task-form">
              <input
                type="text"
                name="task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
                className="add-task-input"
              />
              <button type="submit" className="btn btn-add-task">
                Add
              </button>
            </form>
          </div>
          <div className="edit-container">
            {editIndex !== null && (
              <EditTask
                task={todos[editIndex]}
                onSave={(newValue) => handleEditTask(editIndex, newValue)}
                onCancel={() => setEditIndex(null)}
              />
            )}
          </div>
          <div className="content-container">
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
        </div>
      </div>
    </>
  );
}

export default App;
