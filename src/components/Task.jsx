import React from "react";

const Task = (props) => {
  const { task,index,handleDelete,handleEdit } = props;

  return (
    <div>
      <p>{task}</p>
      <button onClick={() => handleEdit(index)}>edit</button>
      <button onClick={() => handleDelete(index)}>
        x
      </button>
    </div>
  );
};

export default Task;
