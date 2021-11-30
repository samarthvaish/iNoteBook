import React, { useState } from "react";
import { useContext } from "react";
import notesContext from "../context/notes/notesContext";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const context = useContext(notesContext);
  const { Signups } = context;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const Onsubmit = async (e) => {
    e.preventDefault();
    let response = await Signups(user.name, user.email, user.password);

    if (response.success) {
      localStorage.setItem("token" , response.jwt )
      navigate("/");
      props.showAlert("User created Successfully" , "success")
    } else {
      navigate("/signup");
      props.showAlert("Please try with different credentials" , "danger")
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={Onsubmit}>
        <div className="mb-3">
          <label htmlFor="tittle" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={user.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmexampleInputPassword1"
            name="cpassword"
            value={user.cpassword}
            onChange={onChange}
          />
        </div>
        <div className="mx-2 my-2">
          {user.cpassword !== "" ? (
            <label>
              {user.password !== user.cpassword ? "Password Not Match" : ""}{" "}
            </label>
          ) : (
            <label></label>
          )}
        </div>
        <button
          type="submit"
          disabled={user.password !== user.cpassword ? true : false}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
