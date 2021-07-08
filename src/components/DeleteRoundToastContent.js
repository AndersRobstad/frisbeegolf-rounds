import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosHandler";

const DeleteRoundToastContent = (props) => {
  const handleDeleteRound = () => {
    axiosInstance
      .delete(`/api/rounds/${props.roundId}/`)
      .then((res) => {
        if (res.status === 200) {
          window.location = "/rounds";
        }
      })
      .catch((err) => {
        toast.error("Could not delete round..", {
          containerId: "normal",
          toastId: "deleteRoundFailed",
        });
      });
  };

  return (
    <div>
      <Typography align="center" component="p" variant="h5">
        Are you sure you want to delete the current round?
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
              handleDeleteRound();
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

export default DeleteRoundToastContent;
