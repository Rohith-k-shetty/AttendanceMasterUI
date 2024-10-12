import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const ResetButton = ({ params, handleReset }) => {
  return (
    <Tooltip title="Reset Password">
      <IconButton
        color="secondary"
        onClick={() => handleReset(params.row.id)}
        size="small"
        sx={{
          backgroundColor: "#4caf50",
          "&:hover": { backgroundColor: "#a5d6a7" },
          width: "32px",
          height: "32px",
          borderRadius: "50%",
        }}
      >
        <LockIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default ResetButton;
