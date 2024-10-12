/* eslint-disable react/prop-types */
import { TextField, MenuItem, Grid } from "@mui/material";

// SuperAdminEditForm Component
export function SuperAdminEditForm({ formData, handleChange, errors }) {
  const genderOptions = [
    { name: "Male" },
    { name: "Female" },
    { name: "Other" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          sx={{ mb: 2 }} // Margin between fields
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Gender"
          name="gender"
          select
          variant="outlined"
          value={formData.gender}
          onChange={handleChange}
          error={!!errors.gender}
          helperText={errors.gender}
          fullWidth
          sx={{ mb: 2 }}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Phone"
          name="phoneNo"
          variant="outlined"
          type="number"
          value={formData.phoneNo}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
}
