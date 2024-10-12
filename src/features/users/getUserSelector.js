export const selectgetUserLoading = (state) => state.getUser.loading;
export const selectgetUserError = (state) => state.getUser.error;
export const selectgetUserSuccess = (state) => state.getUser.success;
export const selectgetUserData = (state) => state.getUser.userData || {};
