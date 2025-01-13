import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store";
import { authService } from "../appwrite";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const authenticate = async (data, actionType) => {
    setError("");
    try {
      let session;
      if (actionType === "login") {
        session = await authService.login(data);
      } else if (actionType === "register") {
        session = await authService.createAccount(data);
      }

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    error,
    authenticate,
  };
};
