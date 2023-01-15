import * as types from "../actions/actionTypes";
import { userId } from "../services/api";

const initialState = {
  chatList: {
    loading: false,
    data: null,
    error: null,
  },
  chatDetail: {
    loading: false,
    data: null,
    error: null,
  },
  sendChat: {
    loading: false,
    data: null,
    error: null,
  },
  deleteChat: {
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
    // Chat detail
    case types.CHAT_DETAIL_REQUEST:
      return {
        ...state,
        chatDetail: {
          ...state.chatDetail,
          loading: true,
        },
      };
    case types.CHAT_DETAIL_SUCCESS:
      return {
        ...state,
        chatDetail: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case types.CHAT_DETAIL_FAILURE:
      return {
        ...state,
        chatDetail: {
          ...state.chatDetail,
          loading: false,
          error: action.error,
        },
      };
    // send chat
    case types.SEND_CHAT_REQUEST:
      let newData = [...state.chatDetail.data];
      const date = new Date().toDateString().replace(/(?<=\d) /, ", ");
      const hour =
        new Date().getHours() > 9
          ? new Date().getHours()
          : `0${new Date().getHours()}`;
      const minute =
        new Date().getMinutes() > 9
          ? new Date().getMinutes()
          : `0${new Date().getMinutes()}`;
      let message;
      if (action.payload.owner !== userId) {
        message = {
          message: action.payload.message,
          name: "Tobi Roppo",
          owner: { id: "" },
          publishDate: date,
          time: `${hour}:${minute}`,
          status: "received",
          background: "bg-orange-transparent",
          textColor: "text-orange",
        };
      } else {
        message = {
          message: action.payload.message,
          name: "You",
          owner: { id: userId },
          publishDate: date,
          time: `${hour}:${minute}`,
          status: "sent",
          background: "bg-purple-transparent",
          textColor: "text-purple",
        };
      }

      if (
        new Date(
          newData[newData.length - 1].chats[0].publishDate
        ).toDateString() === new Date().toDateString()
      ) {
        newData[newData.length - 1].chats.push(message);
      } else {
        newData.push({ date, chats: [message] });
      }
      return {
        ...state,
        chatDetail: { ...state.chatDetail, data: newData },
        sendChat: {
          ...state.sendChat,
          loading: true,
        },
      };

    case types.SEND_CHAT_SUCCESS:
      return {
        ...state,
        sendChat: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case types.SEND_CHAT_FAILURE:
      return {
        ...state,
        sendChat: {
          ...state.sendChat,
          loading: false,
          error: action.error,
        },
      };

    // delete chat
    case types.DELETE_CHAT_REQUEST:
      let filtered = [];
      for (let i = 0; i < state.chatDetail.data.length; i++) {
        const item = state.chatDetail.data[i];
        const filteredChats = item.chats.filter(
          (chat) => chat.id !== action.payload
        );
        if (filteredChats.length > 0) {
          filtered.push({
            date: item.date,
            chats: filteredChats,
          });
        }
      }
      return {
        ...state,
        deleteChat: {
          ...state.deleteChat,
          loading: true,
        },
        chatDetail: {
          ...state.chatDetail,
          data: filtered,
        },
      };
    case types.DELETE_CHAT_SUCCESS:
      return {
        ...state,
        deleteChat: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case types.DELETE_CHAT_FAILURE:
      return {
        ...state,
        deleteChat: {
          ...state.deleteChat,
          loading: false,
          error: action.error,
        },
      };

    // edit chat
    case types.EDIT_CHAT:
      let editedChatIndex = state.chatDetail.data[
        action.payload.itemIdx
      ].chats.findIndex((chat) => chat.id === action.payload.id);
      let newChats = [...state.chatDetail.data];
      newChats[action.payload.itemIdx].chats[editedChatIndex].message =
        action.payload.message;
      return {
        ...state,
        chatDetail: {
          ...state.chatDetail,
          data: newChats,
        },
      };
    default:
      return state;
  }
};
