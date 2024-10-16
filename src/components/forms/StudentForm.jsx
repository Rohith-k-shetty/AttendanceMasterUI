/* eslint-disable react/prop-types */
import { TextField, MenuItem, Grid } from "@mui/material";

export function StudentForm({
  formData,
  handleChange,
  errors,
  years,
  courses,
}) {
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
          sx={{ mb: 2 }}
          autoComplete="name"
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
          autoComplete="username"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="new-password"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="new-password"
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
          label="Course"
          name="courseId"
          select
          variant="outlined"
          value={formData.courseId}
          onChange={handleChange}
          error={!!errors.courseId}
          helperText={errors.courseId}
          fullWidth
          sx={{ mb: 2 }}
        >
          {courses.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.courseName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Year"
          name="yearId"
          select
          variant="outlined"
          value={formData.yearId}
          onChange={handleChange}
          error={!!errors.yearId}
          helperText={errors.yearId}
          fullWidth
          sx={{ mb: 2 }}
        >
          {years.map((year) => (
            <MenuItem key={year.id} value={year.id}>
              {year.year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Phone"
          name="phoneNo"
          type="number"
          variant="outlined"
          value={formData.phoneNo}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Parent Phone"
          name="parentPhone"
          type="number"
          variant="outlined"
          value={formData.parentPhone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Parent Email"
          name="parentEmail"
          type="email"
          variant="outlined"
          value={formData.parentEmail}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
}
