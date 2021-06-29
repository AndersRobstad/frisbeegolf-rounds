import { Badge, Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getReadableDate } from "../utils/Utils";

const useStyles = makeStyles((theme) => ({
  roundsContainer: {
    marginTop: "20px",
    width: "100%",
    paddingBottom: 60,
  },
  roundBox: {
    backgroundColor: theme.palette.primary.secondary,
    color: "white",
    borderRadius: "10px",

    "&:hover": {
      cursor: "pointer",
    },
  },
  courseInfo: {
    marginTop: "5px",
    marginBottom: 0,
  },
  courseDate: {
    marginTop: "4px",
    paddingBottom: "20px",
  },
}));

const DisplayRounds = (props) => {
  const classes = useStyles();

  const generateRoundBox = (round, index, finished) => {
    return (
      <Grid
        className={classes.roundBox}
        item
        key={index * 0.2345}
        style={{
          marginBottom: "10px",
          minWidth: "90%",
          paddingBottom: "5px",
          paddingLeft: "5px",
        }}
      >
        <Box
          onClick={() => {
            window.location = `rounds/${round.id}`;
          }}
        >
          <h3 className={classes.courseInfo}>
            <b>{round.course.name + " - " + round.course.holes + " Holes"}</b>
          </h3>
          {/*Gjør datoen mindre og tettere mot navnet*/}
          <Typography component="h6" variant="p" className={classes.courseDate}>
            {getReadableDate(round.date)}
          </Typography>
          <Grid container direction="row" spacing={1} justify="space-around">
            {round.players.map((player, index) => (
              <Grid key={index * 0.6969} item>
                <Badge
                  badgeContent={
                    (round.scores[index] > 0 ? "+" : "") + round.scores[index]
                  }
                >
                  {player}
                </Badge>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    );
  };

  return (
    <div className={classes.roundsContainer}>
      <Divider />
      {props.data.ongoing_rounds.length > 0 ? (
        <Typography align="center" component="p" variant="h5">
          Ongoing rounds
        </Typography>
      ) : null}
      <Grid container justify="center" direction="column" alignItems="center">
        {props.data.ongoing_rounds.map((round, index) =>
          generateRoundBox(round, index * 0.642, false)
        )}
        {props.data.finished_rounds.length > 0 ? (
          <Typography align="center" component="p" variant="h5">
            Finished rounds
          </Typography>
        ) : null}
        {props.data.finished_rounds.map((round, index) =>
          generateRoundBox(round, index, true)
        )}
      </Grid>
    </div>
  );
};

export default DisplayRounds;
