import React, { useState } from "react";
import { Box, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const VerticalTable = ({
  rows,
  columns,
  totalRows,
  pageSize,
  currentPage,
  onPaginationChange,
}) => {
  return (
    <Card>
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
            pageSizeOptions={[10, 20, 40]}
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
    </Card>
  );
};

// PropTypes for better validation and documentation
VerticalTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
};

export default VerticalTable;
