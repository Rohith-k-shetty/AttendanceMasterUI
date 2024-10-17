export const selectgetCourseLoading = (state) => state.getCourse.loading;
export const selectgetCourseError = (state) => state.getCourse.error;
export const selectgetCourseSuccess = (state) => state.getCourse.success;
export const selectgetCourseData = (state) => state.getCourse.courseData || {};
