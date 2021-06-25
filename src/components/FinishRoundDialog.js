import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  finishRoundContainer: {
    width: "100%",
    marginTop: "200px",
  },
  finishButton: {
    //Sentreres ikke ??
    marginLeft: "30%",
    marginRight: "30%",
    width: "40%",
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
  const [isDialogVisible, setDialogVisible] = useState(false);

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
      setDialogVisible(true);
    } else {
      postRoundData();
    }
  };

  const postRoundData = () => {
    console.log("POSTING");
  };

  return (
    <React.Fragment>
      <div className={classes.finishRoundContainer}>
        <Button
          className={classes.finishButton}
          onClick={() => handleFinishRound()}
          variant="contained"
          color="primary"
          size="large"
        >
          Finish round
        </Button>
      </div>
      {isDialogVisible ? (
        <div className={classes.partialRoundDialog}>
          <Typography
            align="center"
            component="p"
            variant="h6"
            style={{ marginBottom: "10px" }}
          >
            All holes are not finished, do you still want to finish the round?
          </Typography>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button
                onClick={() => {
                  setDialogVisible(false);
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
                onClick={() => setDialogVisible(false)}
                variant="contained"
                color="primary"
                size="large"
              >
                No
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default FinishRoundDialog;
