import { all, call } from "redux-saga/effects";
import { chatSaga } from "./chatSaga";

export default function* rootSaga() {
  yield all([call(chatSaga)]);
}
