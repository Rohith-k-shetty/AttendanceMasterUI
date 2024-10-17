export const selectSearchVerticals = (state) =>
  state.verticalSearch.verticals || [];
export const selectVerticalSearchLoading = (state) =>
  state.verticalSearch.loading;
export const selectVerticalSearchError = (state) => state.verticalSearch.error;
export const selectVedrticalSearchQuery = (state) => state.verticalSearch.query;
