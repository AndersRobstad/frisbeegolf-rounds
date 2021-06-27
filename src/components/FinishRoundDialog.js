import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../utils/axiosHandler";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  finishRoundContainer: {
    width: "100%",
  },
  partialRoundDialog: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    width: "80%",
    backgroundColor: "grey",
    paddingBottom: "5px",
    borderRadius: "10px",
  },
}));

const FinishRoundDialog = (props) => {
  const classes = useStyles();

  const handleFinishRound = () => {
    let allHolesFinished = true;
    props.round.hole_results.every((hole) => {
      if (hole.scores.some((s) => s === 0)) {
        allHolesFinished = false;
        return false;
      }
      return true;
    });
    if (!allHolesFinished) {
      toast(<ToastContent />);
    } else {
      postRoundData();
    }
  };

  const postRoundData = () => {
    axiosInstance
      .post(`/api/rounds/${props.roundId}/`, {
        lastHoleScores: props.lastHole.scores,
        lastHoleId: props.lastHole.id,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location = `/rounds/${res.data}/overview/`;
        }
      });
  };

  const ToastContent = () => {
    return (
      <div>
        <Typography align="center" component="p" variant="h5">
          All holes are not finished, do you still want to finish the round?
        </Typography>
        <hr />
        <br />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <Button
              onClick={() => {
                postRoundData();
              }}
              variant="contained"
              color="primary"
              size="large"
            >
              Yes
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => window.location.reload()}
              variant="contained"
              color="primary"
              size="large"
            >
              No
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className={classes.finishRoundContainer}>
        <Grid container justify="center">
          <Button
            item
            className={classes.finishButton}
            onClick={() => handleFinishRound()}
            variant="contained"
            color="primary"
            size="large"
          >
            Finish round
          </Button>
        </Grid>
      </div>
      <ToastContainer
        bodyStyle={{ width: "100%", textAlign: "center", color: "black" }}
        closeOnClick={false}
        draggable={false}
        autoClose={false}
        position="top-center"
      />
    </React.Fragment>
  );
};

export default FinishRoundDialog;
