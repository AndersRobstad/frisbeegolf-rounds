import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RoundDetails from "../components/RoundDetails";

const RoundOverviewPage = () => {
  return (
    <React.Fragment>
      <Header /> <RoundDetails /> <Navbar />
    </React.Fragment>
  );
};

export default RoundOverviewPage;
