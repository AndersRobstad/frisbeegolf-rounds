import { Badge, Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getReadableDate } from "../utils/Utils";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

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
    fontSize: "0.75em",
  },
}));

const DisplayRounds = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const isLogin = search.get("login");

  if (isLogin === "true") {
    const username = search.get("username");
    toast.success(
      `Successfully logged in. Welcome ${
        username[0].toUpperCase() + username.slice(1).toLowerCase()
      }!`,
      {
        toastId: "preventDuplicateId",
      }
    );
    history.replace("/rounds/");
  }

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
            window.location = `rounds/${round.id}/${
              finished ? "overview" : ""
            }`;
          }}
        >
          <h3 className={classes.courseInfo}>
            <b>{round.course.name + " - " + round.course.holes + " Holes"}</b>
          </h3>
          {/*Gjør datoen mindre og tettere mot navnet*/}
          <Typography
            component="p"
            variant="inherit"
            className={classes.courseDate}
          >
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
          <React.Fragment>
            <Divider style={{ width: "100%" }} />
            <Typography align="center" component="p" variant="h5">
              Finished rounds
            </Typography>
          </React.Fragment>
        ) : null}
        {props.data.finished_rounds.map((round, index) =>
          generateRoundBox(round, index, true)
        )}
      </Grid>
    </div>
  );
};

export default DisplayRounds;
