import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button, Grid, Link } from "@material-ui/core/";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerContent = () => {
  return (
    <div>
      <h4>You are not authorized to view this page.</h4>
      <h4>
        Please sign up if you are a new user, or sign in if you already have an
        account.
      </h4>
      <hr />
      <br />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
        spacing={2}
      >
        <Link href="/register">
          <Button color="primary" size="large" item variant="outlined">
            Sign up
          </Button>
        </Link>
        <Link href="/">
          <Button color="primary" size="large" item variant="outlined">
            sign in
          </Button>
        </Link>
      </Grid>
    </div>
  );
};

const RequireAuthDialog = () => {
  toast(<ToastContainerContent />);
  return (
    <ToastContainer
      toastStyle={{ marginTop: "20vh" }}
      bodyStyle={{ width: "100%", textAlign: "center", color: "black" }}
      autoClose={false}
      closeButton={false}
      closeOnClick={false}
      draggable={false}
      limit={1}
      position="top-center"
    />
  );
};

export default RequireAuthDialog;
