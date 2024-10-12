import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ params, handleDelete }) => {
  return (
    <Tooltip title="Delete">
      <IconButton
        color="error"
        onClick={() => handleDelete(params.row.id)}
        size="small"
        sx={{
          backgroundColor: "#f50057",
          "&:hover": { backgroundColor: "#ffcdd2" },
          width: "32px", // Same size as avatar
          height: "32px",
          borderRadius: "50%", // Make the button round
        }}
      >
        <DeleteIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
