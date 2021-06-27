import React from "react";
import { useHistory } from "react-router-dom";

const IsAuthenticated = (ComposedComponent) => {
  const Authenticate = (props) => {
    const history = useHistory();
    if (!sessionStorage.getItem("access")) {
      return <ComposedComponent {...props} />;
    } else {
      history.push("/rounds");
      return null;
    }
  };
  return Authenticate;
};

export default IsAuthenticated;
