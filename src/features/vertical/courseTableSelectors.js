export const selectCourseTableData = (state) =>
  state.courseTable.courseTableData || [];
export const selectCourseTableLoading = (state) => state.courseTable.loading;
export const selectCourseTableError = (state) => state.courseTable.error;
export const selectCourseTableSuccess = (state) => state.courseTable.success;
export const selectCourseTableTotalCount = (state) =>
  state.courseTable.totalCount || 0;
