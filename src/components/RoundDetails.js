import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosHandler";

const dummyData = {
  course: "Sukkevann",
  date: "16.10-1999",
  players: ["anders", "magnus", "marcus", "sindre"],
  holes: [
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
    {
      par: 3,
      scores: [1, 2, 3, 4],
    },
  ],
};

const RoundDetails = () => {
  const [isRound, setRound] = useState();
  const params = useParams();
  const splits = isRound ? (isRound.course.holes === 18 ? 2 : 3) : 2;
  const perSection = (isRound ? isRound.course.holes : 18) / splits;
  const placements = isRound ? [...isRound.scores].sort() : [];
  const scoresCopy = isRound ? [...isRound.scores] : [];
  const playersCopy = isRound ? [...isRound.players] : [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/rounds/${params.id}/overview/`
      );
      setRound(response.data);
    };
    fetchData();
  }, [params.id]);

  const generateSection = (flight, perSection) => {
    const startingHole = flight === 0 ? 0 : flight === 1 ? 9 : 18;

    const getColor = (difference) => {
      if (difference === -2) {
        return "gold";
      } else if (difference === -1) {
        return "green";
      } else if (difference === 0) {
        return "grey";
      } else if (difference === 1) {
        return "red";
      } else if (difference === 2) {
        return "purple";
      } else {
        return "#E75480";
      }
    };

    return (
      <React.Fragment key={flight * 0.69692}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center" colSpan={perSection}>
              Hole
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            {[...Array(perSection).keys()].map((number) => (
              <TableCell align="center" key={number * 0.236783}>
                {number + 1 + startingHole}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isRound.players.map((name, playerIndex) => (
            <TableRow key={playerIndex * 0.237535}>
              <TableCell>{name}</TableCell>
              {[...isRound.hole_results]
                .splice(startingHole, perSection + startingHole)
                .map((hole, index) => (
                  <TableCell
                    align="center"
                    key={index * 0.2345}
                    style={{
                      backgroundColor: getColor(
                        hole.scores[playerIndex] - hole.hole.par
                      ),
                    }}
                  >
                    {hole.scores[playerIndex]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </React.Fragment>
    );
  };
  console.log(isRound);
  return (
    <React.Fragment>
      {isRound ? (
        <React.Fragment>
          <Typography component="h5" variant="h5" align="center" noWrap>
            {isRound.course.name + " - " + isRound.date}
          </Typography>
          <Table>
            <TableBody>
              {placements.map((placement, index) => {
                const player = playersCopy[scoresCopy.indexOf(placement)];
                scoresCopy.splice(isRound.players.indexOf(player), 1);
                playersCopy.splice(isRound.players.indexOf(player), 1);
                return (
                  <TableRow key={index * 0.3451}>
                    <TableCell colSpan={2}>{player}</TableCell>
                    <TableCell>
                      {placement > 0 ? "+" + placement : placement}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table>
            {[...Array(splits).keys()].map((number) =>
              generateSection(number, perSection)
            )}
          </Table>
        </React.Fragment>
      ) : (
        <h1>Loading ....</h1>
      )}
    </React.Fragment>
  );
};

export default RoundDetails;
