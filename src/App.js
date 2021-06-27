import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./pages/Homepage";
import NewRoundPage from "./pages/NewRoundPage";
import OngoingRoundPage from "./pages/OngoingRoundPage";
import RoundOverviewPage from "./pages/RoundOverviewPage";
import CoursesPage from "./pages/CoursesPage";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/courses" exact>
          <CoursesPage />
        </Route>
        <Route path="/statistics" exact>
          <StatisticsPage />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/new" exact>
          <NewRoundPage />
        </Route>
        <Route path="/rounds" exact>
          <Homepage />
        </Route>
        <Route path="/rounds/:id" exact>
          <OngoingRoundPage />
        </Route>
        <Route path="/rounds/:id/overview" exact>
          <RoundOverviewPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
