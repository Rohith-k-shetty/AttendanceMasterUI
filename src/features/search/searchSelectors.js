// Selectors for search slice
export const selectSearchUsers = (state) => state.search.users || [];
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchQuery = (state) => state.search.query;
