import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"; // You can change the icon if needed

const ActivateButton = ({ params, handleActivate }) => {
  return (
    <Tooltip title="Activate">
      <IconButton
        color="primary"
        onClick={() => handleActivate(params.row.id)}
        size="small"
        sx={{
          backgroundColor: "#1D3557", // Yellow background for activation
          "&:hover": { backgroundColor: "#477AC2" }, // Slightly lighter yellow on hover
          width: "32px", // Same size as avatar
          height: "32px",
          borderRadius: "50%", // Make the button round
        }}
      >
        <ManageAccountsIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default ActivateButton;
