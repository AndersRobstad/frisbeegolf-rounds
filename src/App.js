import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "./components/Courses";
import Homepage from "./components/Homepage";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/courses" exact>
          <Courses />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
