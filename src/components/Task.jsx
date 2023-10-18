import editImage from '../assets/edit.png'
const Task = (props) => {
  const { task, index, handleDelete, handleEdit } = props;

  return (
    <div className="todo">
      <div className="todo-task">
        <p className="todo-task-text">{task}</p>
      </div>
      <div className="todo-task-btns">
        <button className="btn btn-task-edit" onClick={() => handleEdit(index)}>
          <img src={editImage} alt='editImage' className='edit-image'/>
        </button>
        <button
          className="btn btn-task-delete"
          onClick={() => handleDelete(index)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Task;
