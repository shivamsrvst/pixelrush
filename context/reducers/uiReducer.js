// reducers/uiReducer.js
const initialState = {
  isLoading: false,
  toastMessage: null, // State for the toast message
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return { ...state, isLoading: true };
    case "HIDE_LOADING":
      return { ...state, isLoading: false };
    case "SHOW_TOAST":
      return { ...state, toastMessage: action.payload };
    case "HIDE_TOAST":
      return { ...state, toastMessage: null }; 
    default:
      return state;
  }
};
  export default uiReducer;