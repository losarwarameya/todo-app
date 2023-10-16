import React from "react";

const Task = (props) => {
  const { task, index, handleDelete, handleEdit } = props;

  return (
    <div>
      <div>
        <p>{task}</p>
      </div>
      <button onClick={() => handleEdit(index)}>edit</button>
      <button onClick={() => handleDelete(index)}>✖</button>
    </div>
  );
};

export default Task;
