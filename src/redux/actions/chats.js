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

// Get chat detail
export const chatDetailRequest = () => {
  return {
    type: types.CHAT_DETAIL_REQUEST,
  };
};

export const chatDetailSuccess = (data) => {
  return {
    type: types.CHAT_DETAIL_SUCCESS,
    data,
  };
};

export const chatDetailFailure = (error) => {
  return {
    type: types.CHAT_DETAIL_FAILURE,
    error,
  };
};

// Send Chat
export const sendChatRequest = (payload) => {
  return {
    type: types.SEND_CHAT_REQUEST,
    payload,
  };
};

export const sendChatSuccess = (data) => {
  return {
    type: types.SEND_CHAT_SUCCESS,
    data,
  };
};

export const sendChatFailure = (error) => {
  return {
    type: types.SEND_CHAT_FAILURE,
    error,
  };
};

// Delete Chat
export const deleteChatRequest = (payload) => {
  return {
    type: types.DELETE_CHAT_REQUEST,
    payload,
  };
};

export const deleteChatSuccess = (data) => {
  return {
    type: types.DELETE_CHAT_SUCCESS,
    data,
  };
};

export const deleteChatFailure = (error) => {
  return {
    type: types.DELETE_CHAT_FAILURE,
    error,
  };
};


// Edit Chat
export const editChat = (payload) => {
  return {
    type: types.EDIT_CHAT,
    payload,
  };
};
