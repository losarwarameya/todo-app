import { useState, useRef, useEffect } from "react";

const EditTask = (props) => {
  const { task, onSave, onCancel } = props;
  const [input, setInput] = useState(task);
  const editRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(input);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  useEffect(() => {
    editRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="edit-task-form">
      <input
        type="text"
        name="task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={editRef}
        className="edit-task-input"
      />
      <button type="submit" className="btn btn-edit-confirm">✔</button>
      <button onClick={handleCancel} className="btn btn-edit-cancel">✖</button>
    </form>
  );
};

export default EditTask;
