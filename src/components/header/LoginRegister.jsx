import React, { useState, Activity } from "react";
import { Login } from "../LoginRegister";
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
      <button className="btn btn-success">SignUp</button>
      {/* {showLogInRegister.showLogIn && <Login show={setShowLogInRegister} />} */}
      <Activity mode={showLogInRegister.showLogIn ? "visible" : "hidden"}>
        <Login show={setShowLogInRegister} />
      </Activity>
    </div>
  );
};

export default LoginRegister;
