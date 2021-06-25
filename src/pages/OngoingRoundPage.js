import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../utils/axiosHandler";
import FinishHole from "../components/FinishHole";
import FinishRoundDialog from "../components/FinishRoundDialog";

const OngoingRoundPage = () => {
  const params = useParams();
  const [isRound, setRound] = useState("");
  const [isCurrentHole, setCurrentHole] = useState();
  //Send inn en changeHole funksjon i props fra OngoingRoundPage som brukes her.

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/api/rounds/${params.id}`);
      setRound(response.data);
      setCurrentHole(
        response.data.hole_results[
          response.data.hole_results.find((hole) =>
            hole.scores.every((s) => s === 0)
          ).hole.hole_no - 1
        ]
      );
    };
    fetchData();
  }, [params.id]);

  const changeHole = (next) => {
    let nextHoleIndex = isCurrentHole.hole.hole_no + (next ? 1 : -1) - 1;
    setCurrentHole(isRound.hole_results[nextHoleIndex]);
  };

  return (
    <React.Fragment>
      <Header />
      {isRound && isCurrentHole ? (
        <React.Fragment>
          <FinishHole
            data={isCurrentHole}
            players={isRound.players}
            changeHole={changeHole}
            holes={isRound.hole_results.length}
          />
          {isCurrentHole.hole.hole_no === isRound.hole_results.length ? (
            <FinishRoundDialog round={isRound} />
          ) : null}
        </React.Fragment>
      ) : (
        <h5>Loading round...</h5>
      )}
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

export default OngoingRoundPage;
