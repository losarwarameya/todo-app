import { useState, useRef, useEffect } from "react";
import Task from "./Task";
import EditTask from "./EditTask";

import { createClient } from "@supabase/supabase-js";

function App() {
  const supabaseUrl = "https://yhgnykgkrhwkchpfbiez.supabase.co";

  useEffect(() => {
    // Initialize the Supabase client
    const supabase = createClient(
      supabaseUrl,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZ255a2drcmh3a2NocGZiaWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NzA4NzMsImV4cCI6MjAxMzA0Njg3M30.WZKIj8D2UT1tgDSQx8hRq4cwT48n7hgQv55PL5p1WYk"
    );
    // Fetch data from a table
    const fetchData = async () => {
      let { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log(data);
      }
    };

    fetchData();
  }, []);

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([e.target[0].value, ...todos]);
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
  }, []);

  // Save Todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Load Todos from local storage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

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
