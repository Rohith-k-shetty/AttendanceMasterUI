/* eslint-disable react/prop-types */
import React from "react";
import { TextField, Button, Grid } from "@mui/material";

export function CourseForm({ formData, handleChange, handleSubmit, errors }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Course Name"
            name="courseName"
            variant="outlined"
            value={formData.courseName}
            onChange={handleChange}
            error={!!errors.courseName}
            helperText={errors.courseName}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Course Code"
            name="courseCode"
            variant="outlined"
            value={formData.courseCode}
            onChange={handleChange}
            error={!!errors.courseCode}
            helperText={errors.courseCode}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
