import React from "react";
import { Box } from "@mui/material";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ResetButton from "./ResetButton";

const RenderButtons = ({
  params,
  handleEdit,
  handleDelete,
  handlePasswordReset,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center" // Center buttons vertically
      sx={{ height: "100%", marginLeft: "20px" }} // Ensure Box takes full height
    >
      {/* Render Edit Button */}
      <EditButton params={params} handleEdit={handleEdit} />

      {/* Spacer between buttons */}
      <Box sx={{ mx: 0.5 }} />

      {/* Render Delete Button */}
      <DeleteButton params={params} handleDelete={handleDelete} />

      {/* Spacer between buttons */}
      <Box sx={{ mx: 0.5 }} />

      {/* Render Reset Button */}
      <ResetButton params={params} handleReset={handlePasswordReset} />
    </Box>
  );
};

export default RenderButtons;
