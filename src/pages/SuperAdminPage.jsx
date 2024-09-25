import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
import AdminDrawer from "../components/AdminDrawer";
import { columns, rows } from "../internals/data/gridData";
import { TittleCard } from "../components/TittleCard";

const SuperAdminPage = () => {
  const [search, setSearch] = useState("");
  const [filterRows, setFilterRows] = useState(rows);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Dummy departments and years for dropdowns
  const departments = [
    { id: 1, name: "Science" },
    { id: 2, name: "Mathematics" },
    { id: 3, name: "English" },
  ];

  const years = [
    { id: 1, name: "First Year" },
    { id: 2, name: "Second Year" },
  ];

  // Filter rows based on search input
  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilterRows(filtered);
  };

  // Reset the search and filter
  const handleReset = () => {
    setSearch("");
    setFilterRows(rows);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        p: 3,
      }}
    >
      <TittleCard
        tittle={"Manage Super Admin"}
        button={"Add SuperAdmin"}
        buttonAction={() => {
          setDrawerOpen(true);
        }}
      />

      {/* Filters Section */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearch}
        />
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      {/* Data Table Section */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <CustomizedDataGrid rows={filterRows} columns={columns} />
      </Box>

      {/* Drawer for Adding Admin */}
      <AdminDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={"SuperAdmin"}
        departments={departments}
        years={years}
      />
    </Box>
  );
};

export default SuperAdminPage;
