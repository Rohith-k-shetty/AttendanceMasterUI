import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CustomUserTable({
  rows,
  columns,
  pageSize,
  setPageSize,
  setPage,
  isNextPageAvailable,
}) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onPageChange={(newPage) => {
          if (isNextPageAvailable) {
            setPage(newPage);
          }
        }}
        autoHeight
        rowHeight={70} // Adjust row height to make it larger
        pageSizeOptions={[10, 20, 50, 100]}
        disableColumnResize
        density="comfortable"
        sx={{
          "& .MuiDataGrid-cell": {
            padding: "16px", // Increase padding for larger rows
          },
          "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-row": {
            minHeight: "70px", // Ensure minimum height for rows
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
}
