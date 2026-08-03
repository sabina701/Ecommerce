import { useState, Activity, useEffect, useContext } from "react";
import { Login } from "../LoginRegister";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Register from "../Register";
import API from "../../api/axios";

const LoginRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [showLogInRegister, setShowLogInRegister] = useState({
    showLogIn: false,
    showRegister: false,
  });

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const isLoggedIn = !!currentUser;

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

  // Check login status
  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       await API.get("/check");
  //       setIsLoggedIn(true);
  //     } catch (err) {
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkLogin();
  // }, []);
  const handleLogout = async () => {
    try {
      const res = await API.post("/logout");

      if (res.data.success) {
        toast.success(res.data.message);

        // Clear global user
        setCurrentUser(null);

        navigate("/");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div>
      <select
        className="form-select"
        defaultValue=""
        onChange={(e) => {
          if (e.target.value === "login") {
            setShowLogInRegister({
              ...showLogInRegister,
              showLogIn: true,
            });
          } else if (e.target.value === "signup") {
            setShowLogInRegister({
              ...showLogInRegister,
              showRegister: true,
            });
          } else if (e.target.value === "logout") {
            handleLogout();
          }

          e.target.value = "";
        }}
      >
        <option value="" disabled>
          Account
        </option>

        {!isLoggedIn && (
          <>
            <option value="login">Login</option>
            <option value="signup">Sign Up</option>
          </>
        )}

        {isLoggedIn && <option value="logout">Logout</option>}
      </select>

      <Activity mode={showLogInRegister.showLogIn ? "visible" : "hidden"}>
        <Login show={setShowLogInRegister} from={from} />
      </Activity>

      <Activity mode={showLogInRegister.showRegister ? "visible" : "hidden"}>
        <Register show={setShowLogInRegister} />
      </Activity>
    </div>
  );
};

export default LoginRegister;
