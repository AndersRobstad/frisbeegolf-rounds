import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: "auto",
      width: "80%",
    },
  },
}));

const handleRegister = (formEvent) => {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.target);
  const data = Object.fromEntries(formData);
  console.log(data);
};

const Register = () => {
  const classes = useStyles();
  return (
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
          <TextField
            variant="filled"
            label="repeat password"
            name="repeated_password"
            type="password"
            required
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
  );
};

export default Register;
