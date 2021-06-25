import { Badge, Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  roundsContainer: {
    marginTop: "20px",
    width: "100%",
    paddingBottom: 60,
  },
  roundBox: {
    backgroundColor: "lightGrey",

    "&:hover": {
      backgroundColor: "darkgrey",
      cursor: "pointer",
    },
  },
  test: {
    width: "80%",
  },
}));

// {
//   course: { name: "Sukkevann", holes: 18 },
//   players: [
//     { name: "anders", score: "+5" },
//     { name: "marcus", score: "+2" },
//     { name: "sindre", score: "+1" },
//     { name: "magnus", score: "-2" },
//   ],
//   date: "16. juni 2020",
// }

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
                {/* {player.name + ":" + player.score} */}
                <Badge
                  badgeContent={round.scores[index]}
                  //Add some kind of nice styling to the badge
                  //color="secondary"
                  backgroundColor="primary"
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
      <Typography align="center">Ongoing rounds</Typography>
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
