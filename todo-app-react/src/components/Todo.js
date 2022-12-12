import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export default function Todo(props) {
  console.log("props.name:" + props.name);
  const [newName, setNewName] = useState(props.name);
  console.log("newName:" + newName);
  console.log("type:" + props.type);
  console.log("props.completed:" + props.completed);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    console.log("handling submit");
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const [isEditing, setEditing] = useState(false);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}></label>
        <input
          id={props.id}
          className="todo-text todoinput"
          type="text"
          value={newName}
          onChange={handleChange}
        />
        <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => {
              setNewName(props.name);
              setEditing(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn__primary todo-edit"
            onClick={() => {
              props.editTask(props.id, newName);
              setEditing(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          className="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
        <div className="btn-group">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => {
              setEditing(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              props.deleteTask(props.id);
            }}
          />
        </div>
      </div>
    </div>
  );

  return isEditing ? editingTemplate : viewTemplate;
}
