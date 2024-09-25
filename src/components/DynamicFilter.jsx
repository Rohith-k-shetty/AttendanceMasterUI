import { Stack, TextField, Button, MenuItem } from "@mui/material";

export function DynamicFilter({
  search,
  departments,
  years,
  users,
  statusOptions,
  selectedDepartment,
  selectedYear,
  selectedUser,
  selectedStatus,
  handleSearch,
  handleReset,
  handleChange,
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
      {/* Department Filter */}
      <TextField
        label="Department"
        name="department"
        variant="outlined"
        size="small"
        select
        value={selectedDepartment}
        onChange={handleChange}
        sx={{ minWidth: 150 }}
      >
        {departments.map((dept) => (
          <MenuItem key={dept.id} value={dept.id}>
            {dept.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Year Filter */}
      <TextField
        label="Year"
        name="year"
        variant="outlined"
        size="small"
        select
        value={selectedYear}
        onChange={handleChange}
        sx={{ minWidth: 150 }}
      >
        {years.map((year) => (
          <MenuItem key={year.id} value={year.id}>
            {year.name}
          </MenuItem>
        ))}
      </TextField>

      {/* User Filter */}
      <TextField
        label="User"
        name="user"
        variant="outlined"
        size="small"
        select
        value={selectedUser}
        onChange={handleChange}
        sx={{ minWidth: 150 }}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Status Filter */}
      <TextField
        label="Status"
        name="status"
        variant="outlined"
        size="small"
        select
        value={selectedStatus}
        onChange={handleChange}
        sx={{ minWidth: 150 }}
      >
        {statusOptions.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Search Field */}
      <TextField
        label="Search"
        name="search"
        variant="outlined"
        size="small"
        value={search}
        onChange={handleSearch}
        sx={{ minWidth: 150 }}
      />

      {/* Buttons */}
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Stack>
  );
}
