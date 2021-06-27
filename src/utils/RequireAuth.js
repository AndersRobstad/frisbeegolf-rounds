import React from "react";
import RequireAuthDialog from "../components/RequireAuthDialog";

const RequireAuth = (ComposedComponent) => {
  const Authenticate = (props) => {
    if (sessionStorage.getItem("access")) {
      console.log("HAS access");
      return <ComposedComponent {...props} />;
    }
    console.log("NOTTT");
    return <RequireAuthDialog />;
  };
  return Authenticate;
};

export default RequireAuth;
