/* eslint-disable react/prop-types */
import {
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
  Autocomplete,
  Paper,
} from "@mui/material";

export function DynamicFilter({
  departments,
  courses,
  years,
  users,
  statusOptions,
  selectedDepartment,
  selectedCourse,
  selectedYear,
  selectedUser,
  selectedStatus,
  handleSearch,
  handleReset,
  handleChange,
  handleSelectSearch,
  setSelectedUser,
  requiredFilters,
  handleInputChange,
  loading,
}) {
  // this is for adjusting the height
  // const CustomPaper = (props) => (
  //   <Paper {...props} sx={{ maxHeight: 200, overflowY: "auto" }} />
  // );

  return (
    <Box sx={{ mb: 3 }}>
      {/* First Row: Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
        {/* Department Filter */}
        {requiredFilters.includes("department") && departments && (
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
                {dept.departmentName}-{dept.departmentCode}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Department Filter */}
        {requiredFilters.includes("course") && courses && (
          <TextField
            label="Course"
            name="course"
            variant="outlined"
            size="small"
            select
            value={selectedCourse || ""} // Handle empty state
            onChange={handleChange}
            sx={{ minWidth: 240 }}
          >
            {courses.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.courseName}({dept.courseCode})
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Status Filter */}
        {requiredFilters.includes("status") && statusOptions && (
          <TextField
            label="Status"
            name="status"
            variant="outlined"
            size="small"
            select
            value={selectedStatus || ""}
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
        {requiredFilters.includes("year") && years && (
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
                {year.year}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Search Combo Box */}
        {requiredFilters.includes("user") && (
          <Autocomplete
            options={Array.isArray(users) ? users : []} // Ensure users is an array
            getOptionLabel={(option) => {
              const name = option.name || ""; // Handle missing values with fallbacks
              const username = option.username ? `(${option.username})` : "";
              const phone = option.phoneNo ? ` - ${option.phoneNo}` : "";
              return `${name} ${username}${phone}`.trim(); // Combine and trim the string
            }}
            onInputChange={(event, newInputValue) => {
              if (event && event.type === "change") {
                handleInputChange(event, newInputValue);
              }
            }}
            value={selectedUser} // Controlled value
            loading={loading}
            onChange={(event, newValue) => {
              setSelectedUser(newValue); // Update selected user
              handleSelectSearch(newValue ? newValue.id : null); // Pass the selected user ID to the handler
            }}
            disableClearable
            // PaperComponent={CustomPaper}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 200,
                  "& .MuiAutocomplete-popupIndicator": {
                    display: "none", // Hide the popup indicator if needed
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
