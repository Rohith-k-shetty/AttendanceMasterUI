// Assuming you have a slice named 'vertical'
export const selectVertical = (state) => state.vertical; // Accessing vertical state directly

export const selectDepartments = (state) =>
  selectVertical(state).departments || [];
export const selectCourses = (state) => selectVertical(state).courses || [];
export const selectYears = (state) => selectVertical(state).years || [];
export const selectVerticalLoading = (state) => selectVertical(state).loading;
export const selectVerticalError = (state) => selectVertical(state).error;
