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
import { makeStyles } from "@material-ui/core/styles";
import { getReadableDate } from "../utils/Utils";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: "7px 0 7px 0",
    borderRight: "0.6px solid white",
  },
}));

const RoundDetails = () => {
  const classes = useStyles();
  const [isRound, setRound] = useState();
  const params = useParams();
  console.log(isRound);
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
              Holes
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ width: "10%" }}></TableCell>
            {[...Array(perSection).keys()].map((number) => (
              <TableCell
                padding="none"
                align="center"
                key={number * 0.236783}
                className={classes.tableCell}
                style={{ width: 60 / perSection + "%" }}
              >
                {number + 1 + startingHole}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isRound.players.map((name, playerIndex) => (
            <TableRow key={playerIndex * 0.237535}>
              <TableCell
                padding="none"
                align="center"
                style={{ width: "10%" }}
                className={classes.tableCell}
              >
                {name}
              </TableCell>
              {[...isRound.hole_results]
                .splice(startingHole, perSection + startingHole)
                .map((hole, index) => (
                  <TableCell
                    padding="none"
                    align="center"
                    key={index * 0.2345}
                    style={{
                      backgroundColor: getColor(
                        hole.scores[playerIndex] - hole.hole.par
                      ),
                      width: 60 / perSection + "%",
                    }}
                    className={classes.tableCell}
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

  return (
    <React.Fragment>
      {isRound ? (
        <React.Fragment>
          <Typography component="h5" variant="h5" align="center" noWrap>
            {isRound.course.name + " - " + getReadableDate(isRound.date)}
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
          <Table className={classes.table} style={{ tableLayout: "auto" }}>
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
