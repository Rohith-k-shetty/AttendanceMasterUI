import { Box } from "@mui/material";
import { TittleCard } from "../components/TittleCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../utils/storage";
import { useCallback } from "react";
import { mapVerticalsToFields } from "../utils/functions";
import NoDataFound from "../components/buttons/NoDataFound";
import ConfirmationPopup from "../components/buttons/ConfirmationPopup";
import toast from "react-hot-toast";
import { statusOptions } from "../utils/constants";
import { debounce, throttle } from "lodash";
import { useMemo } from "react";
import AddVerticalDrawer from "../components/drawer/AddVerticalDrawer";
import { VerticalFilter } from "../components/search/VerticalFilter";
import {
  clearVerticalSearch,
  searchVerticals,
} from "../features/search/verticalSearchSlice";
import {
  selectSearchVerticals,
  selectVerticalSearchLoading,
} from "../features/search/verticalSearchSelector";
import VerticalTable from "../components/tables/VerticalTable";
import { departmentColumns } from "../utils/colums/DepartmentColums";
import {
  fetchDepartmentList,
  resetDepartmentTableState,
} from "../features/vertical/departmentTableSlice";
import {
  selectDepartmentTableData,
  selectDepartmentTableTotalCount,
} from "../features/vertical/departmentTableSelectors";
import EditVerticalDrawer from "../components/drawer/EditVerticalDrawer";
import { selectgetDepartmentData } from "../features/vertical/getDepartmentSelectors";
import {
  activateVertical,
  deleteVertical,
} from "../features/vertical/modifyVerticalSlice";
import { getDepartment } from "../features/vertical/getDepartmentSlice";
import { selectModifyVerticalLoading } from "../features/vertical/modifyVerticalSelectors";

export default function DepartmentPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [verticalId, setVerticalId] = useState("");
  const [mappedTeachers, setmappedTeachers] = useState([]);
  const [pageNo, setPageNo] = useState(0); // Current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToActivate, setIdToActivate] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);

  //selectors
  const dispatch = useDispatch();
  const usersDblist = useSelector(selectDepartmentTableData);
  const totalRows = useSelector(selectDepartmentTableTotalCount);
  const searchLoading = useSelector(selectVerticalSearchLoading);
  const loading = useSelector(selectModifyVerticalLoading);
  const verticals = useSelector(selectSearchVerticals);
  const token = getFromLocalStorage("authToken");
  const verticalData = useSelector(selectgetDepartmentData);
  // dynamic filgter part
  const currentRole = "SuperAdmin";
  const currentPage = "DepartmentPage";
  const verticalType = "Department";
  // const requiredFilters =
  //   rolePageMapping[currentRole].pages.find((page) => page.page === currentPage)
  //     ?.requiredFilters || [];

  // useEffect(() => {
  //   dispatch(getDepartments(token));
  //   dispatch(getCourses(token));
  //   dispatch(getYears(token));
  // }, [dispatch]);

  const handleInputChange = useCallback(
    debounce((event, newInputValue) => {
      if (newInputValue.length >= 4) {
        dispatch(
          searchVerticals({
            token,
            query: {
              searchTerm: newInputValue,
              // Status: "Active"
            },
            type: verticalType,
          })
        );
      } else {
        dispatch(clearVerticalSearch());
      }
    }, 300),
    [dispatch, token]
  );

  // Handle change for dropdowns
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    switch (name) {
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
      setVerticalId(newValue);
    },
    [setSelectedVertical]
  );

  //search button api class and use eeffect
  // Function to fetch users
  const fetchVerticals = useCallback(
    (page = 0, limit = pageSize) => {
      const query = {
        id: verticalId,
        status: selectedStatus,
        offset: page * limit,
        limit,
      };
      dispatch(fetchDepartmentList({ token, query, type: verticalType }));
    },
    [dispatch, token, selectedStatus, verticalId, pageSize]
  );

  const throttledFetchVerticals = useCallback(
    throttle((page, pageSize) => {
      fetchVerticals(page, pageSize);
    }, 500),
    [fetchVerticals]
  );

  useEffect(() => {
    throttledFetchVerticals(pageNo, pageSize);
  }, [throttledFetchVerticals, pageNo, pageSize]);

  const handleReset = useCallback(() => {
    // Reset filters
    setVerticalId("");
    setSelectedVertical(null);
    setSelectedStatus("");
    // Clear search results in Redux
    dispatch(resetDepartmentTableState());
    setmappedTeachers([]);
    // Reset pagination state and fetch the first page
    setPageNo(0); // Reset the current page to 0
    setPageSize(10); // Reset to the default page size
    fetchVerticals(0, 10); // Fetch users for the first page with the default page size
  }, [fetchVerticals, dispatch]);

  // Updated handleSearch to fetch users after resetting to the first page
  const handleSearch = useCallback(() => {
    setmappedTeachers([]);
    setPageNo(0); // Reset to the first page
    fetchVerticals(0, pageSize); // Fetch users after search
  }, [fetchVerticals, pageSize]);

  // Memoize the result of mapStudentsToFields
  const memoizedUsers = useMemo(() => {
    if (usersDblist && usersDblist.length > 0) {
      return mapVerticalsToFields(usersDblist, verticalType);
    } else {
      return [];
    }
  }, [usersDblist]);

  // Update the state when memoizedUsers changes
  useEffect(() => {
    setmappedTeachers(memoizedUsers);
  }, [memoizedUsers]);

  // Updated onPaginationChange to use throttledFetchUsers
  const onPaginationChange = useCallback(
    ({ pageSize: newPageSize, page: newPage }) => {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize); // Only update when page size changes
        throttledFetchVerticals(0, newPageSize); // Fetch first page of new page size
      } else {
        setPageNo(newPage); // Update current page without resetting
        throttledFetchVerticals(newPage, pageSize); // Fetch users for new page
      }
    },
    [throttledFetchVerticals, pageSize]
  );

  const handleEdit = (id) => {
    dispatch(getDepartment({ token, id, type: verticalType }));
    setEditDrawerOpen(true);
  };

  //delete and edit popup functions
  const openDeleteDialog = (id) => {
    setIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const openActivateDialog = (id) => {
    setIdToActivate(id);
    setIsActivateDialogOpen(true);
  };

  const handleConfirmDelete = (idToDelete) => {
    dispatch(deleteVertical({ token, id: idToDelete, type: verticalType }))
      .unwrap()
      .then(() => {
        throttledFetchVerticals(pageNo, pageSize);
        toast.success(`Successfully deleted Department.`);
      })
      .catch((error) => {
        toast.error(`Failed to delete Department. ${error.message}`);
      });
  };

  const handleConfirmActivate = (idToActivate) => {
    dispatch(activateVertical({ token, id: idToActivate, type: verticalType }))
      .unwrap()
      .then(() => {
        throttledFetchVerticals(pageNo, pageSize);
        toast.success(`Successfully Activated department.`);
      })
      .catch((error) => {
        toast.error(`Failed to Activate Department. ${error.message}`);
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
        tittle={"Manage Departments"}
        button={"Add Department"}
        buttonAction={() => {
          setDrawerOpen(true);
        }}
      />

      {/* Dynamic Filter Section */}
      <VerticalFilter
        verticals={verticals}
        statusOptions={statusOptions}
        selectedVertical={selectedVertical}
        selectedStatus={selectedStatus}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleChange={handleChange}
        handleSelectSearch={handleSelectSearch}
        setSelectedVertical={setSelectedVertical}
        handleInputChange={handleInputChange}
        loading={searchLoading}
        type={verticalType}
      />

      {/* Data Table Section */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {mappedTeachers.length === 0 ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <NoDataFound message="No Department record found" />
          </Box>
        ) : (
          <VerticalTable
            rows={mappedTeachers}
            columns={departmentColumns(
              handleEdit,
              openDeleteDialog,
              openActivateDialog,
              currentRole
            )}
            totalRows={totalRows}
            pageSize={pageSize}
            currentPage={pageNo} // Current page number
            onPaginationChange={onPaginationChange}
          />
        )}
      </Box>

      <AddVerticalDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        type={verticalType}
        token={token}
        fetchVerticals={() => throttledFetchVerticals(pageNo, pageSize)}
      />

      <EditVerticalDrawer
        open={editDrawerOpen}
        initialData={verticalData}
        onClose={() => setEditDrawerOpen(false)}
        type={verticalType}
        token={token}
        fetchVerticals={() => throttledFetchVerticals(pageNo, pageSize)}
      />

      {/* confirm popup for Delete */}
      <ConfirmationPopup
        open={isDeleteDialogOpen}
        handleClose={() => {
          setIdToDelete(null), setIsDeleteDialogOpen(false);
        }}
        handleDelete={() => handleConfirmDelete(idToDelete)}
        msg={
          "Are you sure you want to delete this Department? This action cannot be undone."
        }
        btnValue={loading ? "Deleting..." : "Delete"}
        heading={"Confirm Delete"}
      />

      {/* confirmation popup for the  activating student */}
      <ConfirmationPopup
        open={isActivateDialogOpen}
        handleClose={() => {
          setIdToActivate(null), setIsActivateDialogOpen(false);
        }}
        handleDelete={() => handleConfirmActivate(idToActivate)}
        msg={"Are you sure you want to make this Department Active ?. "}
        btnValue={loading ? "Activating..." : "Activate"}
        heading={"Confirm Activation"}
      />
    </Box>
  );
}
