import React from "react";
import { useContext, useState } from "react";
import notesContext from "../context/notes/notesContext";
import { useNavigate } from "react-router-dom";

const Longin = (props) => {
  let navigate = useNavigate();
  const context = useContext(notesContext);
  const { login } = context;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await login(user.email, user.password);

    if (response.success) {
      localStorage.setItem("token" , response.jwt )
      navigate("/");
      props.showAlert("LoggedIn Successfully" , "success")
    } else {
      navigate("/login");
      props.showAlert("Invalid Credentials" , "danger")
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name = "email"
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Longin;
