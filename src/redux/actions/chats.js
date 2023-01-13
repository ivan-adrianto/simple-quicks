import * as types from "./actionTypes";

// Get chat list
export const chatListRequest = () => {
  return {
    type: types.CHAT_LIST_REQUEST,
  };
};

export const chatListSuccess = (data) => {
  return {
    type: types.CHAT_LIST_SUCCESS,
    data,
  };
};

export const chatListFailure = (error) => {
  return {
    type: types.CHAT_LIST_FAILURE,
    error,
  };
};
