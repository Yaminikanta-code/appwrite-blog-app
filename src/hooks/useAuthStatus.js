import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function useAuthStatus() {
  const navigate = useNavigate();
  const authStaus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStaus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStaus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStaus, navigate, authentication]);
  return loader;
}

export default useAuthStatus;
