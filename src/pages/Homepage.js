import { Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import DisplayRounds from "../components/DisplayRounds";

const useStyles = makeStyles((theme) => ({}));

const Homepage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header />
      <Grid container justify="center">
        <Grid item>
          <Button variant="contained" color="primary" size="large">
            Create new scorecard
          </Button>
        </Grid>
      </Grid>
      <DisplayRounds />
    </React.Fragment>
  );
};

export default Homepage;
