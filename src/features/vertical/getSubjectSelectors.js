export const selectgetSubjectLoading = (state) => state.getSubject.loading;
export const selectgetSubjectError = (state) => state.getSubject.error;
export const selectgetSubjectSuccess = (state) => state.getSubject.success;
export const selectgetSubjectData = (state) =>
  state.getSubject.subjectData || {};
