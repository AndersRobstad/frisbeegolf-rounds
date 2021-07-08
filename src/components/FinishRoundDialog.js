import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../utils/axiosHandler";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  finishRoundContainer: {
    width: "100%",
  },
  finishButton: {
    marginBottom: "30px",
    animation: `$fadeInRight 0.4s`,
  },
  "@keyframes fadeInRight": {
    "0%": {
      opacity: 0,
      transform: "translateX(-150%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
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
      toast(<ToastContent />, {
        containerId: "dialog",
        toastId: "finishround",
      });
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
          window.location = `/rounds/${res.data}/overview?finishedNow=true`;
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
              key={Math.random()}
            >
              Yes
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => toast.dismiss()}
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
    </React.Fragment>
  );
};

export default FinishRoundDialog;
