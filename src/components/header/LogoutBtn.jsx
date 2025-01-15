import React from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite";
import { logout } from "../../store";
function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 bg-[#611BF8] rounded-full text-white duration-200 hover:bg-[#4f0edf] "
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
