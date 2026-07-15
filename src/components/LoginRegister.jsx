import "../css/LogInRegister.css";
import { useEffect, useRef, useState } from "react";
export function Login({ show }) {
  const modelRef = useRef(null);
  useEffect(() => {
    function handleModel(event) {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        show(false);
      }
    }
    document.addEventListener("mousedown", handleModel);
    return () => document.removeEventListener("mousedown", handleModel);
  }, []);

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    if (userInput.username === "" || userInput.password === "") {
      setError(true);
    }
  }

  const [password, setPassword] = useState(false);
  return (
    <div className="container-fluid login-register">
      <form
        action=""
        className="container"
        ref={modelRef}
        onSubmit={handleSubmit}
      >
        <span className="close-btn" onClick={() => show(false)}>
          x
        </span>
        <h2>Log In</h2>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          className="form-control"
          onChange={(event) => {
            setUserInput((prev) => ({ ...prev, username: event.target.value }));
            setError(false);
          }}
        />
        {error && <p>Empty</p>}
        <label htmlFor="password"></label>
        <input
          type={password ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Enter password"
          className="form-control"
          onChange={(event) => {
            setUserInput((prev) => ({ ...prev, password: event.target.value }));
          }}
        />
        <span
          onClick={() => {
            setPassword((prev) => !prev);
          }}
        >
          {password ? "Hide" : "show"}
        </span>
        <button className="btn btn-primary ">Login</button>
        <span>Don't have an account?</span>
      </form>
    </div>
  );
}
