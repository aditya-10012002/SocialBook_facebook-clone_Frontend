import { useContext, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    loginCall(
      {
        email: email.current.value.trim(),
        password: password.current.value.trim(),
      },
      setError,
      dispatch
    );
  };

  console.log(user);

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
            <p className="loginError">
              {error.response.data
                ? error.response.data
                : "Problem with the server, try again."}
            </p>
          )}
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email address"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="30px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgotten password?</span>
            <hr className="loginForgotHr" />
            <Link className="loginRegisterButton" to="/register">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="inherit" size="30px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
