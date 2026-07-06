import "../css/LogInRegister.css";
import { useEffect, useRef } from "react";
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
  return (
    <div className="container-fluid">
      <form action="" className="container" ref={modelRef}>
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
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          className="form-control"
        />
        <button className="btn btn-primary">Login</button>
        <span>Don't have an account?</span>
      </form>
    </div>
  );
}
