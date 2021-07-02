import {
  Badge,
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
import { useSwipeable } from "react-swipeable";

const useStyles = makeStyles((theme) => ({
  prevButton: {
    position: "absolute",
    top: "22%",
  },
  nextButton: {
    position: "absolute",
    top: "22%",
    right: "0",
  },
  swipeEventBox: {
    minHeight: "450px",
  },
  animate: {
    animation: `$fadeInRight 0.4s`,
  },
  playerScore: {
    animation: `$fadeInTop 0.4s`,
  },
  "@keyframes fadeInTop": {
    "0%": {
      opacity: 0,
      transform: "translateY(-150%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes fadeInRight": {
    "0%": {
      opacity: 1,
      transform: "translateX(-150%)",
    },
    "50%": {
      opacity: 0.25,
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
}));

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

const FinishHole = (props) => {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const [isNewPage, setNewPage] = useState(true);

  const changeScore = (negative, index) => {
    const prevScore = props.data.scores[index];
    let newScore = 0;
    if (prevScore === 0) {
      newScore = props.data.hole.par + (negative ? -1 : 0);
    } else {
      newScore = prevScore + (negative ? -1 : 1);
    }
    props.data.scores[index] = newScore;
    props.currentScores[index] = newScore - props.data.hole.par;
    setNewPage(false);
    forceUpdate();
    props.setResultsChanged();
  };

  const changeHole = (next, holeId) => {
    setNewPage(true);
    props.changeHole(next, holeId);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeHole(true, props.holeScoreId),
    onSwipedRight: () => changeHole(false, props.holeScoreId),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });
  return (
    <div
      {...handlers}
      className={`${classes.swipeEventBox} + ${
        isNewPage ? classes.animate : ""
      }`}
      key={Math.random()}
    >
      {props.data.hole.hole_no !== 1 ? (
        <IconButton
          className={classes.prevButton}
          onClick={() => changeHole(false, props.holeScoreId)}
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
                  <Badge
                    badgeContent={
                      (props.currentScores[index] > 0 ? "+" : "") +
                      props.currentScores[index]
                    }
                  >
                    {player[0].toUpperCase() + player.slice(1).toLowerCase()}
                  </Badge>
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
                <Typography
                  component="p"
                  variant="h6"
                  className={classes.playerScore}
                  key={Math.random()}
                >
                  {props.data.scores[index] === 0
                    ? "-"
                    : props.data.scores[index]}
                </Typography>
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
          onClick={() => changeHole(true, props.holeScoreId)}
        >
          <NavigateNextIcon color="primary" fontSize="large" />
        </IconButton>
      ) : null}
    </div>
  );
};

export default FinishHole;
