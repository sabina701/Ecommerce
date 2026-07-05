import "../css/LogInRegister.css";
export function Login({ show }) {
  return (
    <div className="container-fluid">
      <form action="" className="container">
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
