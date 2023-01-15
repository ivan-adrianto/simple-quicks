import * as types from "../actions/actionTypes";

const initialState = {
  activeMenu: "",
  toastMessage: "",
  toastStatus: "error",
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: action.payload,
      };
    case types.SET_TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: action.payload,
      };
    case types.SET_TOAST_STATUS:
      return {
        ...state,
        toastStatus: action.payload,
      };
    default:
      return state;
  }
};
