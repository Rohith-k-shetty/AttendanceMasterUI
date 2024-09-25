/* eslint-disable react/prop-types */
import {
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
  Autocomplete,
} from "@mui/material";

export function DynamicFilter({
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
  handleSelectSearch,
  setSelectedUser,
  requiredFilters, // New prop to indicate which filters to show
}) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* First Row: Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
        {/* Department Filter */}
        {requiredFilters.includes("department") && (
          <TextField
            label="Department"
            name="department"
            variant="outlined"
            size="small"
            select
            value={selectedDepartment || ""} // Handle empty state
            onChange={handleChange}
            sx={{ minWidth: 200 }}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Status Filter */}
        {requiredFilters.includes("status") && (
          <TextField
            label="Status"
            name="status"
            variant="outlined"
            size="small"
            select
            value={selectedStatus || ""} // Handle empty state
            onChange={handleChange}
            sx={{ minWidth: 200 }}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Year Filter */}
        {requiredFilters.includes("year") && (
          <TextField
            label="Year"
            name="year"
            variant="outlined"
            size="small"
            select
            value={selectedYear || ""} // Handle empty state
            onChange={handleChange}
            sx={{ minWidth: 200 }}
          >
            {years.map((year) => (
              <MenuItem key={year.id} value={year.id}>
                {year.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Search Combo Box */}
        {requiredFilters.includes("user") && (
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.name}
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
              handleSelectSearch(newValue ? newValue.id : null);
            }}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 180,
                  "& .MuiAutocomplete-popupIndicator": {
                    display: "none",
                  },
                }}
              />
            )}
          />
        )}
      </Stack>

      {/* Second Row: Search and Reset Buttons (Centered) */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        marginTop={3} // Centering the buttons
      >
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
