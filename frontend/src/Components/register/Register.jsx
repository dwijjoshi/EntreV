import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(avatar);

    dispatch(registerUser(name, email, password, avatar));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error]);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">EntreV</div>
          <span className="loginDesc">
            A social media made for entrepreneurs
          </span>
        </div>
        <div className="loginRight">
          <form
            className="flex flex-col justify-between gap-y-5"
            onSubmit={submitHandler}
          >
            <div className="registerAvatar">
              <Avatar
                src={avatar}
                alt="User"
                sx={{ height: "8vmax", width: "8vmax", margin: "10px" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <input
              placeholder="Username"
              className="loginInput"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button disabled={loading} className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/">
              <button className="loginRegisterButton">
                Already Registered?
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
