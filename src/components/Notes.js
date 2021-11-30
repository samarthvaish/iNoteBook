import React from "react";
import notesContext from "../context/notes/notesContext";
import { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import { AddNote } from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let context = useContext(notesContext);
  let { notes, getAllNotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  let ref = useRef(null);
  let refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote(currentNote);
  };
  const [note, setnote] = useState({ tittle: "", description: "", tag: "" });
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const onClick = async (e) => {
    // e.preventDefault();
    await editNote({
      id: note._id,
      tittle: note.tittle,
      description: note.description,
      tag: note.tag,
    });
    refClose.current.click();
    // addNote(note.tittle , note.description , note.tag);
  };

  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    value={note.tittle}
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
                    value={note.description}
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
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
