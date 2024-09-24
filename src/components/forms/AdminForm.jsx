import { TextField, MenuItem, Stack } from "@mui/material";

export function AdminForm({ formData, handleChange, errors, departments }) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
      />
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
      />
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
      />
      <TextField
        label="Department"
        name="departmentId"
        select
        variant="outlined"
        value={formData.departmentId}
        onChange={handleChange}
        error={!!errors.departmentId}
        helperText={errors.departmentId}
        fullWidth
      >
        {departments.map((dept) => (
          <MenuItem key={dept.id} value={dept.id}>
            {dept.name}
          </MenuItem>
        ))}
      </TextField>
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
      />
    </Stack>
  );
}
