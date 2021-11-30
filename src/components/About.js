import React from "react";
import { useContext } from "react";
import notesContext from "../context/notes/notesContext";
const About = () => {
  const a = useContext(notesContext);
  return (
    <div>
      <h3>this is about {a.name}</h3>
    </div>
  );
};

export default About;
