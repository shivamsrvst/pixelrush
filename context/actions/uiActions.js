// actions/uiActions.js
export const showLoading = () => ({ type: "SHOW_LOADING" });
export const hideLoading = () => ({ type: "HIDE_LOADING" });
export const showToast = (message) => ({ type: "SHOW_TOAST", payload: message });
export const hideToast = () => ({ type: "HIDE_TOAST" });
