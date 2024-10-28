import {
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
  Autocomplete,
} from "@mui/material";

export function AttendanceFilter({
  role, // Role to determine student or teacher
  departments,
  courses,
  years,
  users,
  selectedDepartment,
  selectedCourse,
  selectedYear,
  selectedUser,
  handleReset,
  handleChange,
  setSelectedUser,
  handleSelectSearch,
  handleInputChange,
  loading,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* First Row: Filters and Reset Button in Horizontal Line */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, flexWrap: "wrap", alignItems: "center" }}
      >
        {/* Conditionally Render Department Filter (only for teacher) */}
        {role === "Teacher" && departments && (
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

        {/* Conditionally Render Course Filter (only for student) */}
        {role === "Student" && courses && (
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
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.courseName}({course.courseCode})
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Conditionally Render Year Filter (only for student) */}
        {role === "Student" && years && (
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

        {/* User Filter (common for both student and teacher) */}
        {users && (
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
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search User"
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

        {/* Reset Button in Horizontal Line */}
        <Button variant="outlined" onClick={handleReset} sx={{ ml: 2 }}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
