import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NewRoundForm from "../components/NewRoundForm";

const NewRoundPage = () => {
  return (
    <React.Fragment>
      <Header />
      <NewRoundForm />
      <Navbar />
    </React.Fragment>
  );
};

export default NewRoundPage;
