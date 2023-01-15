import * as types from "./actionTypes";

export const setActiveMenu = (payload) => {
  return {
    type: types.SET_ACTIVE_MENU,
    payload,
  };
};

export const setToastMessage = (payload) => {
  return {
    type: types.SET_TOAST_MESSAGE,
    payload,
  };
};


export const setToaststatus = (payload) => {
  return {
    type: types.SET_TOAST_STATUS,
    payload,
  };
};
