import { Box, Button, Stack, TextField } from "@mui/material";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
import AdminDrawer from "../components/AdminDrawer";
import { columns, rows } from "../internals/data/gridData";
import { TittleCard } from "../components/TittleCard";
import { useEffect, useState } from "react";
import { DynamicFilter } from "../components/DynamicFilter";
import rolePageMapping from "../utils/rolePageMapping";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  selectDepartments,
  selectVerticalError,
  selectVerticalLoading,
  selectYears,
} from "../features/vertical/verticalSelectors";
import { getFromLocalStorage } from "../utils/storage";
import {
  getCourses,
  getDepartments,
  getYears,
} from "../features/vertical/verticalSlice";
import {
  selectSearchLoading,
  selectSearchUsers,
} from "../features/search/searchSelectors";
import { useCallback } from "react";
import { clearSearch, searchUsers } from "../features/search/searchSlice";

export default function StudentPage() {
  const [filterRows, setFilterRows] = useState(rows);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setselectedCourse] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState("");
  // const user = useSelector((state) => state.auth.user);

  // dynamic filgter part
  const currentRole = "SuperAdmin";
  const currentPage = "StudentPage";
  const requiredFilters =
    rolePageMapping[currentRole].pages.find((page) => page.page === currentPage)
      ?.requiredFilters || [];

  const dispatch = useDispatch();

  // Using selectors to fetch data from Redux store
  const departments = useSelector(selectDepartments);
  const courses = useSelector(selectCourses);
  const years = useSelector(selectYears);
  const loading = useSelector(selectVerticalLoading);
  const error = useSelector(selectVerticalError);

  const token = getFromLocalStorage("authToken");

  useEffect(() => {
    dispatch(getDepartments(token));
    dispatch(getCourses(token));
    dispatch(getYears(token));
  }, [dispatch]);

  const users = useSelector(selectSearchUsers); // Search results from the Redux store
  const searchLoading = useSelector(selectSearchLoading);

  const handleInputChange = useCallback(
    (event, newInputValue) => {
      if (newInputValue.length >= 4) {
        dispatch(
          searchUsers({
            token,
            query: { searchTerm: newInputValue, role: "Student" },
          })
        );
      } else {
        dispatch(clearSearch());
      }
    },
    [dispatch, token]
  );

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
      case "course":
        setselectedCourse(value);
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
    console.log("course", selectedCourse);
    console.log("status", selectedStatus);
    console.log("year", selectedYear);
    console.log("selecctedUser", selectedUser);
    console.log("userId", userId);
  };

  const handleSelectSearch = useCallback(
    (newValue) => {
      setUserId(newValue);
    },
    [setSelectedUser]
  );

  const handleReset = () => {
    setUserId("");
    setSelectedDepartment("");
    setselectedCourse("");
    setSelectedYear("");
    setSelectedUser(null);
    setSelectedStatus("");
    setFilterRows(rows);
    dispatch(clearSearch());
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
        tittle={"Manage Students"}
        button={"Add Student"}
        buttonAction={() => {
          setDrawerOpen(true);
        }}
      />

      {/* Dynamic Filter Section */}
      <DynamicFilter
        departments={departments}
        years={years}
        courses={courses}
        users={users}
        statusOptions={statusOptions}
        selectedDepartment={selectedDepartment}
        selectedCourse={selectedCourse}
        selectedYear={selectedYear}
        selectedUser={selectedUser}
        selectedStatus={selectedStatus}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleChange={handleChange}
        handleSelectSearch={handleSelectSearch}
        setSelectedUser={setSelectedUser}
        requiredFilters={requiredFilters}
        handleInputChange={handleInputChange}
        loading={searchLoading}
      />

      {/* Data Table Section */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <CustomizedDataGrid rows={filterRows} columns={columns} />
      </Box>

      {/* Drawer for Adding Admin */}
      <AdminDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={"Student"}
        departments={departments}
        years={years}
        courses={courses}
        token={token}
      />
    </Box>
  );
}
