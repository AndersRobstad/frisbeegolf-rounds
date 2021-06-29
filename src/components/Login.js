import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Link, Typography } from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: "auto",
      width: "80%",
      marginTop: "5%",
    },
  },
}));

const handleLogIn = (formEvent) => {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.target);
  const data = Object.fromEntries(formData);
  axios.post("api/users/authenticate/", data).then((res) => {
    if (res.status === 200) {
      sessionStorage.setItem("access", res.data.access);
      sessionStorage.setItem("refresh", res.data.refresh);
      window.location = "/rounds";
    } else {
      toast.error("Wrong username or password, please try again.");
    }
  });
};

const Homepage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography compoennt="h3" variant="h3" align="center">
        Log in
      </Typography>
      <form className={classes.form} onSubmit={handleLogIn}>
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
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        draggable
      />
    </React.Fragment>
  );
};

export default Homepage;
