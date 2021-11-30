import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Longin from "./components/Longin";
import { useState } from "react";


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Alert message="Alert" />
          <Routes>
            <Route exact path="/" element={<Home alert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/login" element={<Longin showAlert={showAlert}/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
