import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await API.get("/check");
        setCurrentUser(res.data.user);
      } catch (err) {
        setCurrentUser(null);
      }
    }

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
