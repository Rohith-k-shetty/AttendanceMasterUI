/* eslint-disable react/prop-types */
import React from "react";
import { TextField, Button, Grid } from "@mui/material";

export function SubjectForm({ formData, handleChange, handleSubmit, errors }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Subject Name"
            name="subjectName"
            variant="outlined"
            value={formData.subjectName}
            onChange={handleChange}
            error={!!errors.subjectName}
            helperText={errors.subjectName}
            fullWidth
            sx={{ mb: 2 }} // Margin between fields
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Subject Code"
            name="subjectCode"
            variant="outlined"
            value={formData.subjectCode}
            onChange={handleChange}
            error={!!errors.subjectCode}
            helperText={errors.subjectCode}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
