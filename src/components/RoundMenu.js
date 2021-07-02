import { Fade, IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { toast } from "react-toastify";
import DeleteRoundToastContent from "./DeleteRoundToastContent";
import { useParams } from "react-router-dom";

const RoundMenu = () => {
  const [isAnchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(isAnchorEl);
  const params = useParams();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddPlayer = () => {
    handleCloseMenu();
    toast.error(
      "Not implemented yet, just delete the round and create a new.",
      {
        containerId: "normal",
        toastId: "notImplemented",
      }
    );
  };

  const handleDeleteRound = () => {
    handleCloseMenu();
    toast(<DeleteRoundToastContent roundId={params.id} />, {
      containerId: "dialog",
      toastId: "deletediaglo",
    });
  };

  return (
    <div
      style={{
        width: "31px",
        height: "31px",
        position: "fixed",
        right: "15px",
        top: "50px",
      }}
    >
      <IconButton onClick={handleClick}>
        <MenuIcon color="secondary" fontSize={"large"} />
      </IconButton>
      <Menu
        anchorEl={isAnchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleAddPlayer}>Add player</MenuItem>
        <MenuItem onClick={handleDeleteRound}>Delete round</MenuItem>
      </Menu>
    </div>
  );
};

export default RoundMenu;
