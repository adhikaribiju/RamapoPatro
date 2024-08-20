import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useCurrentUser = () => {
  let user = null;

  try {
    const context = useContext(AuthContext);
    if (context && context.user) {
      user = context.user;
      console.log("User Email:", user.email);
    } else {
      console.log("AuthContext or user is not available.");
    }
  } catch (error) {
    console.error("Error accessing AuthContext:", error);
    user = null; // Set user to null or handle the error appropriately
  }

  return user;
};

export default useCurrentUser;
