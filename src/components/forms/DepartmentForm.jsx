/* eslint-disable react/prop-types */
import React from "react";
import { TextField, Grid } from "@mui/material";

export function DepartmentForm({
  formData,
  handleChange,
  handleSubmit,
  errors,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {" "}
        {/* Add spacing between grid items */}
        <Grid item xs={12}>
          {" "}
          {/* Each item will take the entire row */}
          <TextField
            label="Department Name"
            name="departmentName"
            variant="outlined"
            value={formData.departmentName}
            onChange={handleChange}
            error={!!errors.departmentName}
            helperText={errors.departmentName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          {" "}
          {/* Second item taking full width */}
          <TextField
            label="Department Code"
            name="departmentCode"
            variant="outlined"
            value={formData.departmentCode}
            onChange={handleChange}
            error={!!errors.departmentCode}
            helperText={errors.departmentCode}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
}
