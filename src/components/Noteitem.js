import React from "react";
import { useContext } from "react";
import notesContext from "../context/notes/notesContext";

const Noteitem = (props) => {
  const { note , updateNote} = props;
  const context = useContext(notesContext)
  const {deleteNote} = context
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.tittle}</h5>
          <p className="card-text">{note.description}</p>
          <i className="far fa-trash-alt mx-2" onClick={() => {
            deleteNote(note._id)
            props.showAlert("Deleted Successfully" , "success")
          }}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)
          props.showAlert("Updated Successfully" , "success")
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
