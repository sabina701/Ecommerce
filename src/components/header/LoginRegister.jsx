import React, { useState, Activity } from "react";
import { Login } from "../LoginRegister";
import Register from "../Register";
const LoginRegister = () => {
  const [showLogInRegister, setShowLogInRegister] = useState({
    showLogIn: false,
    showRegister: false,
  });
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() =>
          setShowLogInRegister({
            ...showLogInRegister,
            showLogIn: true,
          })
        }
      >
        LogIn
      </button>
      &nbsp;&nbsp;
      <button
        className="btn btn-success"
        onClick={() =>
          setShowLogInRegister({
            ...showLogInRegister,
            showRegister: true,
          })
        }
      >
        SignUp
      </button>
      <Activity mode={showLogInRegister.showLogIn ? "visible" : "hidden"}>
        <Login show={setShowLogInRegister} />
      </Activity>
      <Activity mode={showLogInRegister.showRegister ? "visible" : "hidden"}>
        <Register show={setShowLogInRegister} />
      </Activity>
    </div>
  );
};

export default LoginRegister;
