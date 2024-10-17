export const selectgetDepartmentLoading = (state) =>
  state.getDepartment.loading;
export const selectgetDepartmentError = (state) => state.getDepartment.error;
export const selectgetDepartmentSuccess = (state) =>
  state.getDepartment.success;
export const selectgetDepartmentData = (state) =>
  state.getDepartment.departmentData || {};
