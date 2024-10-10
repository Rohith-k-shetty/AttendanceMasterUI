import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const InfoButton = ({ handleInfo }) => {
  return (
    <Tooltip title="Information">
      <IconButton
        color="default"
        size="small"
        onClick={(e) => handleInfo()}
        sx={{
          backgroundColor: "#e0e0e0",
          "&:hover": { backgroundColor: "#bdbdbd" },
          width: "32px",
          height: "32px",
          borderRadius: "50%",
        }}
      >
        <InfoIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;
