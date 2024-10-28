import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomStepper from "../components/buttons/CustomStepper";
import UserTable from "../components/tables/UserTable";
import { addStudentColumns } from "../utils/colums/AddStudentColums";
import {
  getCourses,
  getDepartments,
  getYears,
} from "../features/vertical/verticalSlice";
import {
  fetchUserList,
  resetUserTableState,
} from "../features/users/userTableSlice";
import rolePageMapping from "../utils/rolePageMapping";
import { getFromLocalStorage } from "../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  selectDepartments,
  selectYears,
} from "../features/vertical/verticalSelectors";
import {
  selectUserTableData,
  selectUserTableTotalCount,
} from "../features/users/userTableSelector";
import { selectgetUserData } from "../features/users/getUserSelector";
import {
  selectSearchLoading,
  selectSearchUsers,
} from "../features/search/searchSelectors";
import { debounce, throttle } from "lodash";
import { clearSearch, searchUsers } from "../features/search/searchSlice";
import { getUser } from "../features/users/getUserSlice";
import {
  activateUser,
  deleteUser,
  resetUser,
} from "../features/users/userSlice";
import toast from "react-hot-toast";
import { selectUserLoading } from "../features/users/userSelectors";
import { mapStudentsToFields } from "../utils/functions";
import { DynamicFilter } from "../components/search/DynamicFilter";
import { AttendanceFilter } from "../components/search/AttendanceFilter";
import CustomTable from "../components/DataTable/CustomTable";

const steps = ["Add Teachers", "Add Students", "Preview & Finish"];

const TablePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  // const [mappedTeachers, setmappedTeachers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setselectedCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [mappedUsers, setMappedUsers] = useState([]);
  const [pageNo, setPageNo] = useState(0); // Current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToReset, setIdToReset] = useState(null);
  const [idToActivate, setIdToActivate] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const token = getFromLocalStorage("authToken");
  const dispatch = useDispatch();
  // dynamic filgter part
  const currentRole = "SuperAdmin";
  const currentPage = "TablePage";

  const requiredFilters =
    rolePageMapping[currentRole].pages.find((page) => page.page === currentPage)
      ?.requiredFilters || [];

  useEffect(() => {
    dispatch(getDepartments(token));
    dispatch(getCourses(token));
    dispatch(getYears(token));
    dispatch(resetUserTableState());
  }, [dispatch]);

  const departments = useSelector(selectDepartments);
  const courses = useSelector(selectCourses);
  const years = useSelector(selectYears);
  const usersDblist = useSelector(selectUserTableData);
  const user = useSelector(selectgetUserData);
  const totalRows = useSelector(selectUserTableTotalCount);
  const users = useSelector(selectSearchUsers);
  const searchLoading = useSelector(selectSearchLoading);

  // Dummy data for teachers and students
  const dummyTeachers = ["Teacher A", "Teacher B", "Teacher C"];
  const dummyStudents = ["Student 1", "Student 2", "Student 3"];

  // State for added teachers and students
  const [addedTeachers, setAddedTeachers] = useState([]);
  const [addedStudents, setAddedStudents] = useState([]);

  // Step navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to add or remove teachers/students
  const handleAddRemoveItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item)); // Remove if already added
    } else {
      setList([...list, item]); // Add if not present
    }
  };

  const handleInputChange = useCallback(
    debounce((event, newInputValue) => {
      if (newInputValue.length >= 4) {
        dispatch(
          searchUsers({
            token,
            query: { searchTerm: newInputValue, role: "Teacher" },
          })
        );
      } else {
        dispatch(clearSearch());
      }
    }, 300),
    [dispatch, token]
  );

  const loading = useSelector(selectUserLoading);
  // Handle change for dropdowns
  const handleChange = useCallback((event) => {
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
      case "status":
        setSelectedStatus(value);
        setPageNo(0);
        break;
      default:
        break;
    }
  }, []);

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
        status: selectedStatus || "Active",
        yearId: selectedYear || "",
        userId: userId || "",
        role: "Teacher",
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

  const throttledFetchUsers = useCallback(
    throttle((page, pageSize) => {
      fetchUsers(page, pageSize);
    }, 500),
    [fetchUsers]
  );

  useEffect(() => {
    throttledFetchUsers(pageNo, pageSize);
  }, [throttledFetchUsers, pageNo, pageSize]);

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
    throttledFetchUsers(pageNo, pageSize); // Fetch users for the first page with the default page size
  }, [dispatch, throttledFetchUsers, pageNo, pageSize]);

  // Updated handleSearch to fetch users after resetting to the first page
  const handleSearch = useCallback(() => {
    setMappedUsers([]);
    setPageNo(0); // Reset to the first page
    throttledFetchUsers(pageNo, pageSize); // Fetch users after search
  }, [throttledFetchUsers, pageNo, pageSize]);

  // Memoize the result of mapStudentsToFields
  const memoizedUsers = useMemo(() => {
    if (usersDblist && usersDblist.length > 0) {
      return mapStudentsToFields(usersDblist);
    } else {
      return [];
    }
  }, [usersDblist]);

  // Update the state when memoizedUsers changes
  useEffect(() => {
    setMappedUsers(memoizedUsers);
  }, [memoizedUsers]);

  // Updated onPaginationChange to use throttledFetchUsers
  const onPaginationChange = useCallback(
    ({ pageSize: newPageSize, page: newPage }) => {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize); // Only update when page size changes
        throttledFetchUsers(0, newPageSize); // Fetch first page of new page size
      } else {
        setPageNo(newPage); // Update current page without resetting
        throttledFetchUsers(newPage, pageSize); // Fetch users for new page
      }
    },
    [throttledFetchUsers, pageSize]
  );

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
        throttledFetchUsers(pageNo, pageSize);
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
        throttledFetchUsers(pageNo, pageSize);
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
        throttledFetchUsers(pageNo, pageSize);
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
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid item>
            <Typography variant="h5" fontWeight="bold">
              Manage Attendance Book
            </Typography>
          </Grid>
        </CardContent>
      </Card>

      {/* Card containing Stepper and Steps */}
      <Card sx={{ flex: 1, p: 3 }}>
        <CardContent>
          <CustomStepper activeStep={activeStep} />
          {/* Step Content */}

          {activeStep === 0 && (
            <Box>
              {/* filter for the  application*/}
              <Box sx={{ mt: 5, ml: 18, mb: 5 }}>
                <AttendanceFilter
                  role="Teacher" // or "teacher"
                  departments={departments}
                  courses={courses}
                  years={years}
                  users={users}
                  selectedDepartment={selectedDepartment}
                  selectedCourse={selectedCourse}
                  selectedYear={selectedYear}
                  selectedUser={selectedUser}
                  handleReset={handleReset}
                  handleChange={handleChange}
                  setSelectedUser={setSelectedUser}
                  handleSelectSearch={handleSelectSearch}
                  handleInputChange={handleInputChange}
                  loading={loading}
                />
              </Box>

              {/* Two Sections for Teachers List and Added Teachers */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ textAlign: "center" }}
                  >
                    Teachers List
                  </Typography>
                  {/* <CustomTable /> */}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Added Teachers
                  </Typography>
                  <List sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {addedTeachers.map((teacher) => (
                      <ListItem
                        key={teacher}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() =>
                              handleAddRemoveItem(
                                teacher,
                                addedTeachers,
                                setAddedTeachers
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={teacher} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 4, width: 150 }}
                  // disabled={addedTeachers.length === 0}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Step 2: Add Students
              </Typography>

              {/* Two Sections for Students List and Added Students */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    Students List
                  </Typography>
                  <List sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {dummyStudents.map((student) => (
                      <ListItem key={student} sx={{ mb: 1 }}>
                        <Checkbox
                          checked={addedStudents.includes(student)}
                          onChange={() =>
                            handleAddRemoveItem(
                              student,
                              addedStudents,
                              setAddedStudents
                            )
                          }
                        />
                        <ListItemText primary={student} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Added Students
                  </Typography>
                  <List sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {addedStudents.map((student) => (
                      <ListItem
                        key={student}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() =>
                              handleAddRemoveItem(
                                student,
                                addedStudents,
                                setAddedStudents
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={student} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button onClick={handleBack} sx={{ mt: 4, mr: 2, width: 150 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 4, width: 150 }}
                  disabled={addedStudents.length === 0}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Step 3: Preview & Finish
              </Typography>

              <Divider sx={{ mb: 3 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Teachers:
                </Typography>
                <List>
                  {addedTeachers.map((teacher) => (
                    <ListItem key={teacher}>
                      <ListItemText primary={teacher} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="subtitle1" fontWeight="bold">
                  Students:
                </Typography>
                <List>
                  {addedStudents.map((student) => (
                    <ListItem key={student}>
                      <ListItemText primary={student} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button onClick={handleBack} sx={{ mt: 4, mr: 2, width: 150 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 4, width: 150 }}
                  onClick={() => alert("Attendance Book Finished!")}
                >
                  Finish
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TablePage;
