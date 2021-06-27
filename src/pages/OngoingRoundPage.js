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

  let resultsChanged = false;
  //Faktisk funksjonalitet for dette så det ikke postes noe dersm ingenting er endret.

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/api/rounds/${params.id}`);
      setRound(response.data);
      const currentHole = response.data.hole_results.find((hole) =>
        hole.scores.every((s) => s === 0)
      );
      setCurrentHole(
        response.data.hole_results[
          (currentHole
            ? currentHole.hole.hole_no
            : response.data.hole_results.length) - 1
        ]
      );
    };
    fetchData();
  }, [params.id]);

  const changeHole = (next, holeId) => {
    if (
      (next && isCurrentHole.hole.hole_no === isRound.hole_results.length) ||
      (!next && isCurrentHole.hole.hole_no === 1)
    ) {
      return;
    }
    if (resultsChanged) {
      axiosInstance
        .post(`/api/rounds/finish-hole/${holeId}/`, {
          scores: isCurrentHole.scores,
        })
        .then(() => {
          resultsChanged = false;
        });
    }
    let nextHoleIndex = isCurrentHole.hole.hole_no + (next ? 1 : -1) - 1;
    setCurrentHole(isRound.hole_results[nextHoleIndex]);
  };

  const setResultsChanged = () => {
    resultsChanged = true;
  };

  const getCurrentScores = () => {
    const scores = new Array(isRound.players.length).fill(0);
    isRound.hole_results.forEach((hole_result) => {
      hole_result.scores.forEach((score, index) => {
        console.log();
        scores[index] += score !== 0 ? score - hole_result.hole.par : 0;
      });
    });
    return scores;
  };

  return (
    <React.Fragment>
      <Header />
      {isRound && isCurrentHole ? (
        <React.Fragment>
          {isCurrentHole.hole.hole_no === isRound.hole_results.length ? (
            <FinishRoundDialog
              round={isRound}
              roundId={params.id}
              lastHole={isCurrentHole}
            />
          ) : null}
          <FinishHole
            data={isCurrentHole}
            players={isRound.players}
            changeHole={changeHole}
            holes={isRound.hole_results.length}
            holeScoreId={
              isRound.hole_results[isCurrentHole.hole.hole_no - 1].id
            }
            setResultsChanged={setResultsChanged}
            currentScores={getCurrentScores()}
          />
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
