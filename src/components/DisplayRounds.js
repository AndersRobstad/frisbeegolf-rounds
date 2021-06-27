import { Badge, Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
        }}
      >
        <Box
          onClick={() => {
            window.location = `rounds/${round.id}`;
          }}
        >
          <p>
            <b>{round.course.name + " - " + round.course.holes + " Holes"}</b>
          </p>
          {/*Gjør datoen mindre og tettere mot navnet*/}
          <p>{round.date}</p>
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
        <Typography align="center">Ongoing rounds</Typography>
      ) : null}
      <Grid container justify="center" direction="column" alignItems="center">
        {props.data.ongoing_rounds.map((round, index) =>
          generateRoundBox(round, index * 0.642, false)
        )}
        <Typography align="center">Finished rounds</Typography>
        {props.data.finished_rounds.map((round, index) =>
          generateRoundBox(round, index, true)
        )}
      </Grid>
    </div>
  );
};

export default DisplayRounds;
