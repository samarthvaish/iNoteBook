import { useState } from "react";
import notesContext from "./notesContext.js";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  let [notes, setNotes] = useState([]);
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (tittle, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ tittle, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async ({ id, tittle, description, tag }) => {
    console.log("Eidt");
    console.log(
      id,
      tittle,
      description,
      tag,
      `${host}/api/notes/updatenote/${id}`
    );
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ tittle, description, tag }),
    });
    const json = await response.json();
    const newNotes = JSON.parse(JSON.stringify(notes));
    console.log(newNotes);
    newNotes.forEach((note, indx) => {
      if (note._id === id) {
        newNotes[indx].tittle = tittle;
        newNotes[indx].description = description;
        newNotes[indx].tag = tag;
      }
    });
    setNotes(newNotes);
  };

  const Signups = async (name, email, password) => {
    console.log("Signup..............");
    let response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email }),
    });
    response = await response.json();
    return response;
  };

  const login = async (email, password) => {
    let response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    response = await response.json();
    return response;
  };

  return (
    <notesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        setNotes,
        getAllNotes,
        Signups,
        login,
      }}
    >
      {props.children}
    </notesContext.Provider>
  );
};

export default NoteState;
