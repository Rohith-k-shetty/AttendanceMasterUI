import React from "react";
import { Box } from "@mui/material";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ResetButton from "./ResetButton";
import ActivateButton from "./ActivateButton";
import InfoButton from "./InfoButton";

const RenderButtons = ({
  params,
  handleEdit,
  handleDelete,
  handlePasswordReset,
  handleActivate,
  handleInfo,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%", marginLeft: "20px" }} // Ensure Box takes full height
    >
      {/* Render Edit Button */}
      {handleEdit && (
        <Box sx={{ mx: 0.5 }}>
          <EditButton params={params} handleEdit={handleEdit} />
        </Box>
      )}

      {/* Render Delete Button */}
      {handleDelete && (
        <Box sx={{ mx: 0.5 }}>
          <DeleteButton params={params} handleDelete={handleDelete} />
        </Box>
      )}

      {/* Render Reset Button */}
      {handlePasswordReset && (
        <Box sx={{ mx: 0.5 }}>
          <ResetButton params={params} handleReset={handlePasswordReset} />
        </Box>
      )}

      {/* Render Activate Button */}
      {handleActivate && (
        <Box sx={{ mx: 0.5 }}>
          <ActivateButton params={params} handleActivate={handleActivate} />
        </Box>
      )}

      {/* Render Info Button */}
      {handleInfo && (
        <Box sx={{ mx: 0.5 }}>
          <InfoButton params={params} handleInfo={handleInfo} />
        </Box>
      )}
    </Box>
  );
};

export default RenderButtons;
