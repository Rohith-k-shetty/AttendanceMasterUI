import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({ params, handleEdit }) => {
  return (
    <Tooltip title="Edit">
      <IconButton
        color="primary"
        onClick={() => handleEdit(params.row.id)}
        size="small"
        sx={{
          backgroundColor: "#3f51b5",
          "&:hover": { backgroundColor: "#bbdefb" },
          width: "32px", // Same size as avatar
          height: "32px",
          borderRadius: "50%", // Make the button round
        }}
      >
        <EditIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
