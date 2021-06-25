import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Link, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: "auto",
      width: "80%",
    },
  },
}));

const handleLogIn = (formEvent) => {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.target);
  const data = Object.fromEntries(formData);
  axios.post("api/users/authenticate/", data).then((res) => {
    console.log(res);
    sessionStorage.setItem("access", res.data.access);
    sessionStorage.setItem("refresh", res.data.refresh);
  });
};

const Homepage = () => {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={handleLogIn}>
      <Typography compoennt="h3" variant="h3" align="center">
        Log in
      </Typography>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            variant="filled"
            label="username"
            name="username"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            variant="filled"
            label="password"
            name="password"
            type="password"
            required
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log in
          </Button>
        </Grid>
        <Grid item>
          <p>
            Don´t have an account? Sign up <Link href="/register">here</Link>
          </p>
        </Grid>
      </Grid>
    </form>
  );
};

export default Homepage;
