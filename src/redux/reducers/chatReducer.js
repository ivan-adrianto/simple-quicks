import * as types from "../actions/actionTypes";

const initialState = {
  chatList: {
    loading: false,
    data: null,
    error: null,
  },
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    // get chat list
    case types.CHAT_LIST_REQUEST:
      return {
        ...state,
        chatList: {
          ...state.chatList,
          loading: true,
        },
      };
    case types.CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatList: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case types.CHAT_LIST_FAILURE:
      return {
        ...state,
        chatList: {
          ...state.chatList,
          loading: false,
          error: action.error,
        },
      };

    default: 
      return state;
  }
};
