import "./Login.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">EntreV</h3>
          <span className="loginDesc">Social media for Entrepreneurs.</span>
        </div>
        <div className="loginRight">
          <form
            className="flex flex-col gap-y-5 bg-white p-10 rounded-2xl"
            onSubmit={loginHandler}
          >
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="loginButton ">
              Log In
            </button>
            <Link to="/forgot/password">
              <div className=" text-right">
                <span className="">Forgot Password?</span>
              </div>
            </Link>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
