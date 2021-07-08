import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./pages/Homepage";
import NewRoundPage from "./pages/NewRoundPage";
import OngoingRoundPage from "./pages/OngoingRoundPage";
import RoundOverviewPage from "./pages/RoundOverviewPage";
import CoursesPage from "./pages/CoursesPage";
import StatisticsPage from "./pages/StatisticsPage";
import IsAuthenticated from "./utils/IsAuthenticated";
import RequireAuth from "./utils/RequireAuth";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" component={IsAuthenticated(Login)} exact />
          <Route path="/register" component={IsAuthenticated(Register)} exact />
          <Route path="/courses" exact component={RequireAuth(CoursesPage)} />
          <Route
            path="/statistics"
            component={RequireAuth(StatisticsPage)}
            exact
          />
          <Route path="/new" component={RequireAuth(NewRoundPage)} exact />
          <Route path="/rounds" component={RequireAuth(Homepage)} exact />
          <Route
            path="/rounds/:id/"
            component={RequireAuth(OngoingRoundPage)}
            exact
          />
          <Route
            path="/rounds/:id/overview"
            component={RequireAuth(RoundOverviewPage)}
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        draggable
        containerId="normal"
        enableMultiContainer
      />
      <ToastContainer
        bodyStyle={{
          width: "100%",
          textAlign: "center",
          color: "black",
        }}
        style={{ marginTop: "25%" }}
        closeOnClick={false}
        draggable={false}
        autoClose={false}
        position="top-center"
        containerId="dialog"
        enableMultiContainer
      />
    </React.Fragment>
  );
}

export default App;
