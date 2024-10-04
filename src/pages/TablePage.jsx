import { Box, Chip, IconButton, Avatar, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Dummy data generator
const generateDummyData = (num) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    pageTitle: `Page Title ${index + 1}`,
    status: index % 2 === 0 ? "Active" : "Inactive",
    users: Math.floor(Math.random() * 100), // Random number of users
    eventCount: Math.floor(Math.random() * 50), // Random event count
    viewsPerUser: (Math.random() * 10).toFixed(2), // Random views per user
    avatar: {
      name: `User ${index + 1}`,
      color: index % 2 === 0 ? "#3f51b5" : "#f50057", // Assign a color
    }, // Avatar data
  }));
};

// Function to render the avatar
export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }} // Ensure vertical centering
    >
      <Avatar
        sx={{
          backgroundColor: params.value.color,
          width: "32px",
          height: "32px",
          fontSize: "0.85rem",
        }}
      >
        {params.value.name.toUpperCase().substring(0, 1)}
      </Avatar>
    </Box>
  );
}

export function renderDeleteButton(params, handleDelete) {
  return (
    <Tooltip title="Delete">
      <IconButton
        color="error"
        onClick={() => handleDelete(params.row.id)}
        size="small"
        sx={{
          backgroundColor: "#f50057",
          "&:hover": { backgroundColor: "#ffcdd2" },
          width: "32px", // Same size as avatar
          height: "32px",
          borderRadius: "50%", // Make the button round
        }}
      >
        <DeleteIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

export function renderEditButton(params, handleEdit) {
  return (
    <Tooltip title="Edit">
      <IconButton
        color="primary"
        onClick={() => handleEdit(params.row.id)}
        size="small"
        sx={{
          backgroundColor: "#3f51b5",
          "&:hover": { backgroundColor: "#bbdefb" },
          width: "32px", // Same size as avatar
          height: "32px",
          borderRadius: "50%", // Make the button round
        }}
      >
        <EditIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

export function renderEditDeleteActions(params, handleEdit, handleDelete) {
  return (
    <Box
      display="flex"
      alignItems="center" // Center buttons vertically
      sx={{ height: "100%" }} // Make sure Box takes full height
    >
      {renderEditButton(params, handleEdit)}
      <Box sx={{ mx: 0.5 }} /> {/* Spacer between buttons */}
      {renderDeleteButton(params, handleDelete)}
    </Box>
  );
}

// Function to render the status chip
function renderStatus(status) {
  const colors = {
    Online: "success",
    Offline: "default",
    Active: "success",
    Inactive: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

// Generate 100 dummy users
const dummyData = generateDummyData(100);
const totalRows = dummyData.length; // Total number of rows

const handleEdit = (id) => {
  console.log(`Edit row with id: ${id}`);
  // Add your edit logic here
};

const handleDelete = (id) => {
  console.log(`Delete row with id: ${id}`);
  // Add your delete logic here
};

// Column configuration
export const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderAvatar(params),
  },
  { field: "pageTitle", headerName: "Page Title", flex: 1.5, minWidth: 100 },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: "users",
    headerName: "Users",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "eventCount",
    headerName: "Event Count",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "viewsPerUser",
    headerName: "Views per User",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 120,
  },
  // New action column for Edit/Delete buttons
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.5,
    minWidth: 120,
    headerAlign: "left",
    align: "left",
    renderCell: (params) =>
      renderEditDeleteActions(params, handleEdit, handleDelete),
  },
];

export default function TablePage() {
  const [rows, setRows] = useState([]); // State to store rows data
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [currentPage, setCurrentPage] = useState(0); // State to manage current page

  // Function to simulate fetching data from API
  const fetchData = (page, size) => {
    const startIndex = page * size;
    const endIndex = startIndex + size;
    setRows(dummyData.slice(startIndex, endIndex)); // Slice the dummy data for the current page
  };

  useEffect(() => {
    fetchData(currentPage, pageSize); // Fetch data on component mount and when pagination changes
  }, [currentPage, pageSize]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        p: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <DataGrid
          autoHeight
          checkboxSelection
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          pagination
          pageSize={pageSize}
          rowCount={totalRows} // Total number of rows from dummy data
          onPaginationModelChange={({ pageSize, page }) => {
            setPageSize(pageSize);
            setCurrentPage(page); // Update current page
          }}
          paginationMode="server" // Enable server-side pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } }, // Default to first page
          }}
          pageSizeOptions={[10, 20, 50]} // Options for page size
          disableColumnResize
          density="compact" // Change density to make rows smaller
          rowHeight={64} // Set a smaller row height (default is ~52)
          sx={{
            "& .MuiDataGrid-row": {
              minHeight: "48px", // Adjust the minimum height for rows if necessary
            },
          }}
        />
      </Box>
    </Box>
  );
}
