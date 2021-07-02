import React from "react";
import RequireAuthDialog from "../components/RequireAuthDialog";

const RequireAuth = (ComposedComponent) => {
  const Authenticate = (props) => {
    if (sessionStorage.getItem("access")) {
      return <ComposedComponent {...props} />;
    }
    return <RequireAuthDialog />;
  };
  return Authenticate;
};

export default RequireAuth;
