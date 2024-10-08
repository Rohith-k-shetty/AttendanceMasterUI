import { Box } from "@mui/material";
import { TittleCard } from "../components/TittleCard";
import { useEffect, useState } from "react";
import { DynamicFilter } from "../components/DynamicFilter";
import rolePageMapping from "../utils/rolePageMapping";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  selectDepartments,
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
import {
  fetchUserList,
  resetUserTableState,
} from "../features/users/userTableSlice";
import {
  selectUserTableData,
  selectUserTableTotalCount,
} from "../features/users/userTableSelector";
import { mapStudentsToFields } from "../utils/functions";
import UserTable from "../components/tables/userTable";
import NoDataFound from "../components/buttons/NoDataFound";
import UserAddDrawer from "../components/drawer/UserAddDrawer";
import UserEditDrawer from "../components/drawer/UserEditDrawer";
import { getUser } from "../features/users/getUserSlice";
import { selectgetUserData } from "../features/users/getUserSelector";
import { studentColumns } from "../utils/studentColums";
import ConfirmationPopup from "../components/buttons/ConfirmationPopup";
import {
  activateUser,
  deleteUser,
  resetUser,
} from "../features/users/userSlice";
import toast from "react-hot-toast";
import { selectUserLoading } from "../features/users/userSelectors";
import InfoPopup from "../components/buttons/InfoPopup";

export default function StudentPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
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

  const token = getFromLocalStorage("authToken");

  useEffect(() => {
    dispatch(getDepartments(token));
    dispatch(getCourses(token));
    dispatch(getYears(token));
  }, [dispatch]);

  const users = useSelector(selectSearchUsers);
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
    { value: "Active", label: "Active" },
    { value: "Deleted", label: "Deleted" },
  ];

  const usersDblist = useSelector(selectUserTableData);
  const user = useSelector(selectgetUserData);
  const [mappedUsers, setMappedUsers] = useState([]);
  const [pageNo, setPageNo] = useState(0); // Current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const totalRows = useSelector(selectUserTableTotalCount);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToReset, setIdToReset] = useState(null);
  const [idToActivate, setIdToActivate] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const loading = useSelector(selectUserLoading);
  // Handle change for dropdowns
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "department":
        setSelectedDepartment(value);
        setPageNo(0);
        break;
      case "course":
        setselectedCourse(value);
        setPageNo(0);
        break;
      case "year":
        setSelectedYear(value);
        setPageNo(0);
        break;
      case "user":
        setSelectedUser(value);
        setPageNo(0);
        break;
      case "status":
        setSelectedStatus(value);
        setPageNo(0);
        break;
      default:
        break;
    }
  };

  const handleSelectSearch = useCallback(
    (newValue) => {
      setUserId(newValue);
    },
    [setSelectedUser]
  );

  //search button api class and use eeffect
  // Function to fetch users
  const fetchUsers = useCallback(
    (page = 0, limit = pageSize) => {
      const query = {
        departmentId: selectedDepartment || "",
        courseId: selectedCourse || "",
        status: selectedStatus || "",
        yearId: selectedYear || "",
        userId: userId || "",
        role: "Student",
        offset: page * limit,
        limit,
      };
      dispatch(fetchUserList({ token, query }));
    },
    [
      dispatch,
      token,
      selectedDepartment,
      selectedCourse,
      selectedStatus,
      selectedYear,
      userId,
      pageSize,
    ]
  );

  useEffect(() => {
    fetchUsers(pageNo, pageSize);
  }, [fetchUsers, pageNo, pageSize]);

  const handleReset = useCallback(() => {
    // Reset filters
    setUserId("");
    setSelectedDepartment("");
    setselectedCourse("");
    setSelectedYear("");
    setSelectedUser(null);
    setSelectedStatus("");
    // Clear search results in Redux
    dispatch(clearSearch());
    dispatch(resetUserTableState());
    setMappedUsers([]);
    // Reset pagination state and fetch the first page
    setPageNo(0); // Reset the current page to 0
    setPageSize(10); // Reset to the default page size
    fetchUsers(0, 10); // Fetch users for the first page with the default page size
  }, [fetchUsers, dispatch]);

  // Updated handleSearch to fetch users after resetting to the first page
  const handleSearch = useCallback(() => {
    setMappedUsers([]);
    setPageNo(0); // Reset to the first page
    fetchUsers(0, pageSize); // Fetch users after search
  }, [fetchUsers, pageSize]);

  // Map and store the data in local state once the usersDblist changes
  useEffect(() => {
    if (usersDblist && usersDblist.length > 0) {
      const mappedData = mapStudentsToFields(usersDblist); // Mapping function
      setMappedUsers(mappedData);
    } else {
      setMappedUsers([]);
    }
  }, [usersDblist]);

  const handleEdit = (id) => {
    dispatch(getUser({ token, id }));
    setEditDrawerOpen(true);
  };

  //delete and edit popup functions
  const openDeleteDialog = (id) => {
    setIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const openResetDialog = (id) => {
    setIdToReset(id);
    setIsResetDialogOpen(true);
  };

  const openActivateDialog = (id) => {
    setIdToActivate(id);
    setIsActivateDialogOpen(true);
  };

  const openInfoDialog = (id) => {
    setIsInfoDialogOpen(true);
  };

  const handleConfirmDelete = (idToDelete) => {
    dispatch(deleteUser({ token, id: idToDelete }))
      .unwrap()
      .then(() => {
        toast.success(`Successfully deleted user.`);
      })
      .catch((error) => {
        toast.error(`Failed to delete user. ${error.message}`);
      });
  };

  const handleConfirmReset = (idToReset) => {
    dispatch(resetUser({ token, id: idToReset }))
      .unwrap()
      .then(() => {
        toast.success(`Successfully reset password for user.`);
      })
      .catch((error) => {
        toast.error(`Failed to reset password for user. ${error.message}`);
      });
  };

  const handleConfirmActivate = (idToActivate) => {
    dispatch(activateUser({ token, id: idToActivate }))
      .unwrap()
      .then(() => {
        toast.success(`Successfully Activated user.`);
      })
      .catch((error) => {
        toast.error(`Failed to Activate user. ${error.message}`);
      });
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
        {mappedUsers.length === 0 ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <NoDataFound message="No student record found" />
          </Box>
        ) : (
          <UserTable
            rows={mappedUsers}
            columns={studentColumns(
              handleEdit,
              openDeleteDialog,
              openResetDialog,
              openActivateDialog,
              openInfoDialog,
              currentRole
            )}
            totalRows={totalRows} // Total number of records for pagination
            pageSize={pageSize} // Current page size
            currentPage={pageNo} // Current page number
            onPaginationChange={({ pageSize: newPageSize, page: newPage }) => {
              if (newPageSize !== pageSize) {
                setPageSize(newPageSize); // Update page size
                setPageNo(0); // Reset to the first page when the page size changes
                fetchUsers(0, newPageSize); // Fetch users for the first page with the new page size
              } else {
                setPageNo(newPage); // Update current page
                fetchUsers(newPage, pageSize); // Fetch users for the current page
              }
            }}
          />
        )}
      </Box>

      {/* Drawer for Adding Admin */}
      <UserAddDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={"Student"}
        departments={departments}
        years={years}
        courses={courses}
        token={token}
      />

      {/* Drawer for editing student */}
      <UserEditDrawer
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        role={"Student"}
        departments={departments}
        years={years}
        courses={courses}
        token={token}
        user={user}
      />

      {/* confirm popup for Delete */}
      <ConfirmationPopup
        open={isDeleteDialogOpen}
        handleClose={() => {
          setIdToDelete(null), setIsDeleteDialogOpen(false);
        }}
        handleDelete={() => handleConfirmDelete(idToDelete)}
        msg={
          "Are you sure you want to delete this student? This action cannot be undone."
        }
        btnValue={loading ? "Deleting..." : "Delete"}
        heading={"Confirm Delete"}
      />

      {/* confirm popup for Reset Password */}
      <ConfirmationPopup
        open={isResetDialogOpen}
        handleClose={() => {
          setIdToReset(null), setIsResetDialogOpen(false);
        }}
        handleDelete={() => handleConfirmReset(idToReset)}
        msg={"Are you sure you want to Reset the Password to 'Welcome@123' ?."}
        btnValue={loading ? "Reseting..." : "Reset"}
        heading={"Confirm Password Reset"}
      />

      {/* confirmation popup for the  activating student */}
      <ConfirmationPopup
        open={isActivateDialogOpen}
        handleClose={() => {
          setIdToActivate(null), setIsActivateDialogOpen(false);
        }}
        handleDelete={() => handleConfirmActivate(idToActivate)}
        msg={"Are you sure you want to make this Student Active ?. "}
        btnValue={loading ? "Activating..." : "Activate"}
        heading={"Confirm Activation"}
      />

      {/* { information dailog for deleted students} */}
      <InfoPopup
        open={isInfoDialogOpen}
        handleClose={() => {
          setIsInfoDialogOpen(false);
        }}
        msg={"Please Contact Super Admin to Activate this Student ... "}
        heading={"Contact Information"}
      />
    </Box>
  );
}
