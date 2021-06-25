import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";

const dummyData = {
  course: "Sukkevann",
  date: "16.10-1999",
  players: ["anders", "magnus", "marcus", "sindre"],
  //Pass på at spillerne kommer i samme rekkefølge som scores er
  //satt opp
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
      scores: [9, 2, 3, 4],
    },
  ],
};

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

const generateSection = (flight, perSection) => {
  const startingHole = flight === 0 ? 0 : flight === 1 ? 9 : 18;
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
        {dummyData.players.map((name, playerIndex) => (
          <TableRow key={playerIndex * 0.237535}>
            <TableCell>{name}</TableCell>
            {[...dummyData.holes]
              .splice(startingHole, perSection + startingHole)
              .map((hole, index) => {
                const color = getColor(hole.scores[playerIndex] - hole.par);

                return (
                  <TableCell
                    align="center"
                    key={index * 0.2345}
                    style={{ backgroundColor: color }}
                  >
                    {hole.scores[playerIndex]}
                  </TableCell>
                );
              })}
          </TableRow>
        ))}
      </TableBody>
    </React.Fragment>
  );
};

const RoundDetails = () => {
  const splits = dummyData.holes.length === 18 ? 2 : 3;
  const perSection = dummyData.holes.length / splits;
  //console.log(dummyData.holes.splice(9));
  return (
    <React.Fragment>
      {/*Hvorfor er ikke denne sentrert???*/}
      <Typography component="h5" variant="h5" align="center" noWrap>
        {dummyData.course + " - " + dummyData.date}
      </Typography>
      <Table>
        {[...Array(splits).keys()].map((number) =>
          generateSection(number, perSection)
        )}
      </Table>
    </React.Fragment>
  );
};

export default RoundDetails;
