import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/courses" exact>
          <Courses />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/home" exact>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
