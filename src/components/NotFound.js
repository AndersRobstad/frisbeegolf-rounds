import React from "react";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  imageLoader: {
    position: "absolute",
    top: "20vh",
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.imageLoader}>
        <Typography component="p" variant="h6">
          Could not find the requested page, please return to the{" "}
          <Link href={sessionStorage.getItem("access") ? "/rounds" : "/"}>
            application
          </Link>
        </Typography>
      </div>
      {sessionStorage.getItem("access") ? <Navbar /> : null}
    </React.Fragment>
  );
};

export default NotFound;
