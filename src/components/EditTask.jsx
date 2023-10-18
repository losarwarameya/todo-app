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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={editRef}
      />
      <button type="submit">✔</button>
      <button onClick={handleCancel}>✖</button>
    </form>
  );
};

export default EditTask;
