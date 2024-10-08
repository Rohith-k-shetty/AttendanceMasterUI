import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ConfirmationPopup({ open, handleClose, handleDelete, msg, btnValue }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(id) => {
            handleDelete(id); // Call the delete function directly
            handleClose(id); // Close the dialog
          }}
        >
          {btnValue}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationPopup;
