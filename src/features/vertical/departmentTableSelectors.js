export const selectDepartmentTableData = (state) =>
  state.departmentTable.departmentTableData || [];
export const selectDepartmentTableLoading = (state) =>
  state.departmentTable.loading;
export const selectDepartmentTableError = (state) =>
  state.departmentTableData.error;
export const selectDepartmentTableSuccess = (state) =>
  state.departmentTable.success;
export const selectDepartmentTableTotalCount = (state) =>
  state.departmentTable.totalCount || 0;
