import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DisplayRounds from "../components/DisplayRounds";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosHandler";
import { ToastContainer } from "react-toastify";

const Homepage = () => {
  //const classes = useStyles();
  const [isRounds, setRounds] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/api/rounds/`);
      setRounds(response.data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Grid container justify="center">
        <Grid item>
          <Button href="/new" variant="contained" color="primary" size="large">
            Create new scorecard
          </Button>
        </Grid>
      </Grid>
      {isRounds ? <DisplayRounds data={isRounds} /> : null}
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        closeOnClick
        draggable
      />
    </React.Fragment>
  );
};

export default Homepage;
