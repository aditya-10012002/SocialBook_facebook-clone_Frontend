import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value.trim(),
      email: email.current.value.trim(),
      password: password.current.value.trim(),
      passwordAgain: passwordAgain.current.value.trim(),
    };
    try {
      await axios.post("https://socialbook-api.cyclic.app/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialbook</h3>
          <span className="loginDesc">
            Socialbook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className="loginRight">
          {error && (
            <p className="registerError">
              {error.response.data
                ? error.response.data
                : "Problem with the server, try again."}
            </p>
          )}
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              required
              ref={username}
            />
            <input
              placeholder="Email address"
              className="loginInput"
              required
              ref={email}
              type="email"
            />
            <input
              placeholder="Password"
              className="loginInput"
              required
              ref={password}
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm password"
              className="loginInput"
              required
              ref={passwordAgain}
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <hr className="loginForgotHr" />
            <Link to="/login" className="loginRegisterLink">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
