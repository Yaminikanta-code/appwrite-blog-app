import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { login, logout } from "../store/authSlice";

/**
 * A hook that checks if the user is logged in and dispatches the corresponding
 * action to the store. It also returns a boolean indicating whether the loading
 * process is still ongoing.
 *
 * @returns {boolean} - Loading state.
 */
function useLoader() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading;
}

export default useLoader;
