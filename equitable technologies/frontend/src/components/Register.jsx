import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export const Register = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let name, value;
  const handleSubmit = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postdata = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5030/signup", user)
      .then((res) => {
        alert("Your Id to login is " + res.data.id)
        window.localStorage.setItem("equitableID",res.data.id)
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <Nav/>
      <form>
        <input
          name="name"
          value={user.name}
          onChange={handleSubmit}
          type="text"
          placeholder="Name"
        />
        <input
          name="email"
          value={user.email}
          onChange={handleSubmit}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          value={user.password}
          onChange={handleSubmit}
          type="password"
          placeholder="Password"
        />
        <button type="submit" onClick={postdata}>
          Register
        </button>
        <div className="my-class">
          <p
            style={{ color: "grey" }}
            className="link-btn"
            type="submit"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here
          </p>
        </div>
      </form>
    </div>
  );
};
