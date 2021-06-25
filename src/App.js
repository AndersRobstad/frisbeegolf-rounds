import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./pages/Homepage";
import RoundDetails from "./components/RoundDetails";
import NewRoundPage from "./pages/NewRoundPage";
import OngoingRoundPage from "./pages/OngoingRoundPage";

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
        <Route path="/rounds" exact>
          <Homepage />
        </Route>
        <Route path="/round" exact>
          <RoundDetails />
        </Route>
        <Route path="/new" exact>
          <NewRoundPage />
        </Route>
        <Route path="/rounds/:id">
          <OngoingRoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
