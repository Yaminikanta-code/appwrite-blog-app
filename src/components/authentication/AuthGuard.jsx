import React from "react";
import { useAuthStatus } from "../../hooks";

function AuthGuard({ children, authentication = true }) {
  const loader = useAuthStatus(authentication);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthGuard;
