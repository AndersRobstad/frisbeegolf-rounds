import { Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../utils/axiosHandler";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: "15px",
  },
  toolbarTitle: {
    flex: 1,
  },
}));

const handleLogout = () => {
  axiosInstance
    .post("api/users/logout/", { refresh: localStorage.getItem("refresh") })
    .then((res) => {
      console.log(res);
    });
};

const Header = () => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        Disc golf stats
      </Typography>
      <Button onClick={() => handleLogout()} variant="outlined" size="small">
        Log out
      </Button>
    </Toolbar>
  );
};

export default Header;
