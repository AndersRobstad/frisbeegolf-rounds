import {
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  prevButton: {
    position: "absolute",
    top: "50%",
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    right: "0",
  },
}));

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const FinishHole = (props) => {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();

  const changeScore = (negative, index) => {
    const prevScore = props.data.scores[index];
    let newScore = 0;
    if (prevScore === 0) {
      newScore = props.data.hole.par + (negative ? -1 : 0);
    } else {
      newScore = prevScore + (negative ? -1 : 1);
    }
    props.data.scores[index] = newScore;
    forceUpdate();
    props.setResultsChanged();
  };

  return (
    <React.Fragment>
      {props.data.hole.hole_no !== 1 ? (
        <IconButton
          className={classes.prevButton}
          onClick={() => props.changeHole(false, props.holeScoreId)}
        >
          <NavigateBeforeIcon color="primary" fontSize="large" />
        </IconButton>
      ) : null}
      <Typography align="center" component="h3" variant="h3">
        {"Hole " + props.data.hole.hole_no}
      </Typography>
      <Typography align="center" component="h5" variant="h5">
        {"Distance: " + props.data.hole.length + "m"}
      </Typography>
      <Typography align="center" component="h5" variant="h5">
        {"Par " + props.data.hole.par}
      </Typography>
      <Divider />
      <Table>
        <TableBody>
          {props.players.map((player, index) => (
            <TableRow key={index * 0.68832}>
              <TableCell align="center">
                <Typography component="h6" variant="h6">
                  {player}
                </Typography>
              </TableCell>
              <TableCell>
                <MinusBoxIcon
                  onClick={() => changeScore(true, index)}
                  color="primary"
                  fontSize="large"
                />
              </TableCell>
              <TableCell>
                {/* Gjør større */}
                {props.data.scores[index] === 0
                  ? "-"
                  : props.data.scores[index]}
              </TableCell>
              <TableCell>
                <AddBoxIcon
                  onClick={() => changeScore(false, index)}
                  color="primary"
                  fontSize="large"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.holes !== props.data.hole.hole_no ? (
        <IconButton
          className={classes.nextButton}
          onClick={() => props.changeHole(true, props.holeScoreId)}
        >
          <NavigateNextIcon color="primary" fontSize="large" />
        </IconButton>
      ) : null}
    </React.Fragment>
  );
};

export default FinishHole;
