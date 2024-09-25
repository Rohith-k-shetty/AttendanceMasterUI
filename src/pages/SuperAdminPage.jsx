import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
import AdminDrawer from "../components/AdminDrawer";
import { columns, rows } from "../internals/data/gridData";
import { TittleCard } from "../components/TittleCard";
import rolePageMapping from "../utils/rolePageMapping";
import { DynamicFilter } from "../components/DynamicFilter";

const SuperAdminPage = () => {
  const [search, setSearch] = useState("");
  const [filterRows, setFilterRows] = useState(rows);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState("");

  // dynamic filgter part
  const currentRole = "SuperAdmin";
  const currentPage = "SuperAdminPage";
  const requiredFilters =
    rolePageMapping[currentRole].pages.find((page) => page.page === currentPage)
      ?.requiredFilters || [];

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

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // Handle change for dropdowns
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "department":
        setSelectedDepartment(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      case "user":
        setSelectedUser(value);
        break;
      case "status":
        setSelectedStatus(value);
        break;
      default:
        break;
    }
  };

  const handleSearch = (event) => {
    console.log("department", selectedDepartment);
    console.log("status", selectedStatus);
    console.log("year", selectedYear);
    console.log("selecctedUser", selectedUser);
    console.log("userId", userId);
  };

  // Handle selection in Autocomplete combo box
  const handleSelectSearch = (selectedUserId) => {
    setUserId(selectedUserId);
    // Store the selected user ID
  };

  const handleReset = () => {
    setUserId("");
    setSelectedDepartment("");
    setSelectedYear("");
    setSelectedUser(null);
    setSelectedStatus("");
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

      {/* Dynamic Filter Section */}
      <DynamicFilter
        departments={departments}
        years={years}
        users={users}
        statusOptions={statusOptions}
        selectedDepartment={selectedDepartment}
        selectedYear={selectedYear}
        selectedUser={selectedUser}
        selectedStatus={selectedStatus}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleChange={handleChange}
        handleSelectSearch={handleSelectSearch}
        setSelectedUser={setSelectedUser}
        requiredFilters={requiredFilters}
      />

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
