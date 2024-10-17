export const selectSubjectTableData = (state) =>
  state.subjectTable.subjectTableData || [];
export const selectSubjectTableLoading = (state) => state.subjectTable.loading;
export const selectSubjectTableError = (state) => state.subjectTable.error;
export const selectSubjectTableSuccess = (state) => state.subjectTable.success;
export const selectSubjectTableTotalCount = (state) =>
  state.subjectTable.totalCount || 0;
