import { all, call, put, takeLatest } from "redux-saga/effects";
import { chatDetail, chatList, deleteChat, sendChat } from "../services/chat";
import * as actions from "../actions/chats";
import * as types from "../actions/actionTypes";
import { userId } from "../services/api";

/* ---- Get Chat List ---- */
function* chatListSaga() {
  try {
    const { data } = yield call(chatList);
    yield put(actions.chatListSuccess(data.data));
  } catch (error) {
    yield put(actions.chatListFailure(error.response?.data.message));
  }
}

export function* chatListRequestSaga() {
  yield takeLatest(types.CHAT_LIST_REQUEST, chatListSaga);
}

/* ---- Get Chat Detail ---- */
function* chatDetailSaga() {
  try {
    const { data } = yield call(chatDetail);
    let res = [];
    let obj = {};
    let num = 0;
    for (let i = 0; i < data.data.length; i++) {
      const item = data.data[i];
      const date = new Date(item.publishDate)
        .toDateString()
        .replace(/(?<=\d) /, ", ");
      const hour =
        new Date(item.publishDate).getHours() > 9
          ? new Date(item.publishDate).getHours()
          : `0${new Date(item.publishDate).getHours()}`;
      const minute =
        new Date(item.publishDate).getMinutes() > 9
          ? new Date(item.publishDate).getMinutes()
          : `0${new Date(item.publishDate).getMinutes()}`;
      let background;
      let text;
      let status;
      // Create random background color for chats, but if it's our own message, it will be purple
      if (item.owner.id === userId) {
        background = "bg-purple-transparent";
        text = "text-purple";
        status = "sent";
      } else if (item.owner.firstName.length % 2 === 0) {
        background = "bg-orange-transparent";
        text = "text-orange";
        status = "received";
      } else {
        background = "bg-green-transparent";
        text = "text-green";
        status = "received";
      }
      let chat = {
        ...item,
        name:
          item.owner.id === userId
            ? "You"
            : `${item.owner.firstName} ${item.owner.lastName}`,
        background,
        textColor: text,
        time: `${hour}:${minute}`,
        status,
      };
      if (obj[date] > -1) {
        res[obj[date]].chats.unshift(chat);
      } else {
        obj[date] = num;
        num++;
        res.push({
          date: date,
          chats: [chat],
        });
      }
    }
    const comparator = (a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    };
    res.sort((a, b) => comparator(a, b));
    yield put(actions.chatDetailSuccess(res));
  } catch (error) {
    yield put(actions.chatDetailFailure(error.response?.data.message));
  }
}

export function* chatDetailRequestSaga() {
  yield takeLatest(types.CHAT_DETAIL_REQUEST, chatDetailSaga);
}

function* sendChatSaga(action) {
  try {
    const { data } = yield call(sendChat, action.payload);
    yield call(chatDetailSaga);
    yield put(actions.sendChatSuccess(data.data));
  } catch (error) {
    yield put(actions.sendChatFailure(error.response?.data.message));
  }
}

export function* sendChatRequestSaga() {
  yield takeLatest(types.SEND_CHAT_REQUEST, sendChatSaga);
}

function* deleteChatSaga(action) {
  try {
    const { data } = yield call(deleteChat, action.payload);
    yield put(actions.deleteChatSuccess(data.data));
  } catch (error) {
    yield put(actions.deleteChatFailure(error.response?.data.message));
  }
}

export function* deleteChatRequestSaga() {
  yield takeLatest(types.DELETE_CHAT_REQUEST, deleteChatSaga);
}

export function* chatSaga() {
  yield all([
    call(chatListRequestSaga),
    call(chatDetailRequestSaga),
    call(sendChatRequestSaga),
    call(deleteChatRequestSaga),
  ]);
}
