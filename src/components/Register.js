import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Link, Typography } from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomImageLoader from "react-custom-image-loader.";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: "auto",
      width: "80%",
    },
  },
}));

const validatePasswordMatch = (event, isPassword) => {
  event.target.setCustomValidity("");
  const matching_password = event.target.value;

  if (matching_password !== isPassword) {
    event.target.setCustomValidity("Passwords does not match");
  }
};

const handleRegister = (formEvent) => {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.target);
  const data = Object.fromEntries(formData);
  axios.post("/api/users/create/", data).then((res) => {
    if (res.status === 201) {
      toast.success("Account created, you can now sign in!");
    } else {
      if (res.data.username) {
        toast.error(res.data.username[0]);
      }
      if (res.data.password) {
        toast.error("Password: " + res.data.password[0]);
      }
    }
  });
};

const Register = () => {
  const [isPassword, setPassword] = useState("");
  const classes = useStyles();
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleRegister}>
        <Typography compoennt="h3" variant="h3" align="center">
          Register
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
              inputProps={{ maxLength: 9 }}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              variant="filled"
              label="password"
              name="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              inputProps={{ minLength: 8 }}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              variant="filled"
              label="repeat password"
              name="repeated_password"
              inputProps={{ minLength: 8 }}
              type="password"
              required
              onBlur={(event) => validatePasswordMatch(event, isPassword)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign up
            </Button>
          </Grid>
          <Grid item>
            <p>
              Already have an account? Sign in <Link href="/">here</Link>
            </p>
          </Grid>
        </Grid>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        draggable
      />
    </React.Fragment>
  );
};

export default Register;
