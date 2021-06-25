import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NewRoundForm from "../components/NewRoundForm";
import "react-toastify/dist/ReactToastify.css";

const NewRoundPage = () => {
  return (
    <React.Fragment>
      <Header />
      <NewRoundForm />
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        draggable
      />
    </React.Fragment>
  );
};

export default NewRoundPage;
