/* eslint-disable react/prop-types */
import {
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
  Autocomplete,
} from "@mui/material";

export function VerticalFilter({
  verticals,
  statusOptions,
  selectedVertical,
  selectedStatus,
  handleSearch,
  handleReset,
  handleChange,
  handleSelectSearch,
  setSelectedVertical,
  handleInputChange,
  loading,
  type,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* First Row: Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
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

        {/* Search Combo Box */}

        {type === "Department" ? (
          <Autocomplete
            options={Array.isArray(verticals) ? verticals : []}
            getOptionLabel={(option) => {
              const name = option.departmentName || "";
              const code = option.departmentCode
                ? `(${option.departmentCode})`
                : "";
              return `${name} ${code}`.trim();
            }}
            onInputChange={(event, newInputValue) => {
              if (event && event.type === "change") {
                handleInputChange(event, newInputValue);
              }
            }}
            value={selectedVertical}
            loading={loading}
            onChange={(event, newValue) => {
              setSelectedVertical(newValue);
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
                  minWidth: 240,
                  "& .MuiAutocomplete-popupIndicator": {
                    display: "none",
                  },
                }}
              />
            )}
          />
        ) : type === "Course" ? (
          <Autocomplete
            options={Array.isArray(verticals) ? verticals : []}
            getOptionLabel={(option) => {
              const name = option.courseName || "";
              const code = option.courseCode ? `(${option.courseCode})` : "";
              return `${name} ${code}`.trim();
            }}
            onInputChange={(event, newInputValue) => {
              if (event && event.type === "change") {
                handleInputChange(event, newInputValue);
              }
            }}
            value={selectedVertical}
            loading={loading}
            onChange={(event, newValue) => {
              setSelectedVertical(newValue);
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
                  minWidth: 200,
                  "& .MuiAutocomplete-popupIndicator": {
                    display: "none",
                  },
                }}
              />
            )}
          />
        ) : type === "Subject" ? (
          <Autocomplete
            options={Array.isArray(verticals) ? verticals : []}
            getOptionLabel={(option) => {
              const name = option.subjectName || "";
              const code = option.subjectCode ? `(${option.subjectCode})` : "";
              return `${name} ${code}`.trim();
            }}
            onInputChange={(event, newInputValue) => {
              if (event && event.type === "change") {
                handleInputChange(event, newInputValue);
              }
            }}
            value={selectedVertical}
            loading={loading}
            onChange={(event, newValue) => {
              setSelectedVertical(newValue);
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
                  minWidth: 200,
                  "& .MuiAutocomplete-popupIndicator": {
                    display: "none",
                  },
                }}
              />
            )}
          />
        ) : null}
      </Stack>
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
