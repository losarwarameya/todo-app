import React from "react";
import { useState } from "react";

const EditTask = (props) => {
  const { task, onSave, onCancel } = props;

  const [input, setInput] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(input);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">save</button>
      <button onClick={handleCancel}>cancel</button>
    </form>
  );
};

export default EditTask;
