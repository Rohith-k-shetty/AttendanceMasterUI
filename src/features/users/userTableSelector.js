export const selectUserTableData = (state) =>
  state.userTable.userTableData || [];
export const selectUserTableLoading = (state) => state.userTable.loading;
export const selectUserTableError = (state) => state.userTable.error;
export const selectUserTableSuccess = (state) => state.userTable.success;
export const selectUserTableTotalCount = (state) => state.userTable.totalCount;
