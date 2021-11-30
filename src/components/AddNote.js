import React from "react";
import { useState } from "react";
import { useContext } from "react";
import notesContext from "../context/notes/notesContext";

export const AddNote = (props) => {
  const context = useContext(notesContext);
  const { addNote } = context;
  const [note, setnote] = useState({ tittle: "", description: "", tag: "" });
  const onChange = (e) => {
    
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const onClick = (e) => {
    e.preventDefault();
    addNote(note.tittle , note.description , note.tag);
    props.showAlert("Successfully Added" , "success")
  };
  return (
    <div>
      <h3>Add a note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="tittle" className="form-label">
            Tittle
          </label>
          <input
            type="text"
            className="form-control"
            id="tittle"
            aria-describedby="emailHelp"
            name="tittle"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={onClick}>
          Add
        </button>
      </form>
    </div>
  );
};
