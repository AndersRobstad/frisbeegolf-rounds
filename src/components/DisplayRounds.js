import { Badge, Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  roundsContainer: {
    marginTop: "20px",
    width: "100%",
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

const dummyRounds = [
  {
    course: { name: "Sukkevann", holes: 18 },
    players: [
      { name: "anders", score: "+5" },
      { name: "marcus", score: "+2" },
      { name: "sindre", score: "+1" },
      { name: "magnus", score: "-2" },
    ],
    date: "16. juni 2020",
  },
  {
    course: { name: "Eg", holes: 18 },
    players: [
      { name: "anders", score: "+5" },
      { name: "marcus", score: "+2" },
      { name: "sindre", score: "+1" },
      { name: "magnus", score: "-2" },
    ],
    date: "16. juni 2020",
  },
  {
    course: { name: "Søgne", holes: 18 },
    players: [
      { name: "anders", score: "+5" },
      { name: "marcus", score: "+2" },
      { name: "sindre", score: "+1" },
      { name: "magnus", score: "-2" },
    ],
    date: "16. juni 2020",
  },
];

const DisplayRounds = () => {
  const classes = useStyles();
  return (
    <div className={classes.roundsContainer}>
      <Typography align="center">Rounds</Typography>
      <Grid container justify="center" direction="column" alignItems="center">
        {dummyRounds.map((round, index) => (
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
            <Box>
              <p>
                <b>
                  {round.course.name + " - " + round.course.holes + " Holes"}
                </b>
              </p>
              {/*Gjør datoen mindre og tettere mot navnet*/}
              <p>{round.date}</p>
              <Grid
                container
                direction="row"
                spacing={1}
                justify="space-around"
              >
                {round.players.map((player, index) => (
                  <Grid key={index * 0.6969} item>
                    {/* {player.name + ":" + player.score} */}
                    <Badge
                      badgeContent={player.score}
                      //Add some kind of nice styling to the badge
                      //color="secondary"
                      backgroundColor="primary"
                    >
                      {player.name}
                    </Badge>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DisplayRounds;
