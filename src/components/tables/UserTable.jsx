import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const UserTable = ({
  rows,
  columns,
  totalRows,
  pageSize,
  currentPage,
  onPaginationChange,
}) => {
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
          rowCount={totalRows}
          paginationMode="server"
          onPaginationModelChange={({ pageSize, page }) => {
            onPaginationChange({ pageSize, page });
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: pageSize, page: currentPage },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
          rowHeight={64}
          sx={{
            "& .MuiDataGrid-row": {
              minHeight: "48px",
            },
          }}
          // This is avoid the unessary row selection
          onCellClick={(params, event) => {
            if (event && event.stopPropagation) {
              event.stopPropagation();
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default UserTable;
