import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ListIcon from "@material-ui/icons/List";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: "100%",
    position: "fixed",
    bottom: "0px",
    zIndex: 10,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <BottomNavigation
      onChange={(event, newValue) => {
        console.log(newValue);
      }}
      showLabels
      className={classes.navbar}
    >
      <BottomNavigationAction
        label="Rounds"
        value={"rounds"}
        icon={<ListIcon color="primary" fontSize="large" />}
      />
      <Divider orientation="vertical" />
      <BottomNavigationAction
        label="Statistics"
        value="statistics"
        icon={<EqualizerIcon color="primary" fontSize="large" />}
      />
      <Divider orientation="vertical" />
      <BottomNavigationAction
        value="courses"
        label="Courses"
        icon={<GolfCourseIcon color="primary" fontSize="large" />}
      />
    </BottomNavigation>
  );
};

export default Navbar;
