import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RoundDetails from "../components/RoundDetails";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation, useParams } from "react-router-dom";

const RoundOverviewPage = () => {
  const history = useHistory();
  const params = useParams();
  const isFinishedNow = new URLSearchParams(useLocation().search).get(
    "finishedNow"
  );

  if (isFinishedNow === "true") {
    toast.success("Round completed!", {
      toastId: "roundCompleted",
      containerId: "normal",
    });
    history.replace(`/rounds/${params.id}/overview`);
  }

  return (
    <React.Fragment>
      <Header />
      <RoundDetails />
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        closeOnClick
        draggable
      />
    </React.Fragment>
  );
};

export default RoundOverviewPage;
