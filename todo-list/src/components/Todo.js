import { useState } from "react";
import Swal from "sweetalert2";
import "../css/todo.css";

export default function Todo({ item, onUpdate, onComplete, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.title ?? "");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleUpdate() {
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleCheckboxChange(e) {
    onComplete(item.id, e.target.checked);
  }

  return (
    <div className="todo">
      {isEdit ? (
        <form onSubmit={handleSubmit} className="todoUpdateForm">
          <input
            className="todoInput"
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button className="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      ) : (
        <div className="todoInfo">
          <input
            type={"checkbox"}
            onChange={handleCheckboxChange}
            checked={item.checked}
          />
          {item.completed !== true ? (
            <>
              <span
                className="todoTitle"
                style={{
                  color: "",
                  textDecoration: "",
                }}
              >
                {item.title}
              </span>
              <button className="button" onClick={() => setIsEdit(true)}>
                Update
              </button>
              <button
                className="buttonDelete"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <span
                className="todoTitle"
                style={{
                  color: "#ccc",
                  textDecoration: "line-through",
                }}
              >
                {item.title}
              </span>
              <button className="button" onClick={() => setIsEdit(true)}>
                Update
              </button>
              <button
                className="buttonDelete"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
