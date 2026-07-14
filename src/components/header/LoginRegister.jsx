import { useState, Activity, useEffect } from "react";
import { Login } from "../LoginRegister";
import Register from "../Register";
const LoginRegister = () => {
  const [showLogInRegister, setShowLogInRegister] = useState({
    showLogIn: false,
    showRegister: false,
  });
  const isModalOpen =
    showLogInRegister.showLogIn || showLogInRegister.showRegister;

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isModalOpen]);
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
