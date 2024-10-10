import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function InfoPopup({ open, handleClose, msg, heading }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          minWidth: "480px",
        }}
      >
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoPopup;
