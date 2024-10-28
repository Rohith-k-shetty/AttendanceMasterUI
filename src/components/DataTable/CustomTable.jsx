import React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";

export default function CustomTable({
  rows,
  columns,
  selectedStudents,
  page,
  rowsPerPage,
  handleSelectStudent,
  handleSelectAll,
  handleChangePage,
  handleChangeRowsPerPage,
  isAllSelected,
  totalRecords,
  isLoading,
}) {
  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer sx={{ maxHeight: 440, minHeight: 300 }}>
        <Table>
          <TableBody>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedStudents.length > 0 &&
                    selectedStudents.length < rowsPerPage
                  }
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  color="primary"
                />
              </TableCell>
              <TableCell colSpan={columns.length} sx={{ fontWeight: "bold" }}>
                Select All
              </TableCell>
            </TableRow>

            {/* Loading Spinner */}
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStudents.indexOf(row.id) !== -1}
                      onChange={() => handleSelectStudent(row.id)}
                      color="primary"
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} sx={{ fontWeight: "medium" }}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ mt: 2 }}
        labelRowsPerPage="Rows per page"
      />
    </Paper>
  );
}
