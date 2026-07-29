import API from "../api/axios";
import { toast } from "react-toastify";

export async function requireAuth(navigate, currentPath) {
  try {
    await API.get("/check");
    return true; // user is logged in
  } catch (err) {
    toast.error("Please login first");

    navigate("/login", {
      state: { from: currentPath },
    });

    return false; // user is not logged in
  }
}
