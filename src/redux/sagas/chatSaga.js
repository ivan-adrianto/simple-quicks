import { all, call, put, takeLatest } from "redux-saga/effects";
import { chatList } from "../services/chat";
import * as actions from "../actions/chats";
import * as types from "../actions/actionTypes";

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

export function* chatSaga() {
  yield all([
    call(chatListRequestSaga),
  ]);
}
