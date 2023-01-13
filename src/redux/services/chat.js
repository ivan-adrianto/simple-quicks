import api from "./api";
import { API } from "./urls";

export async function chatList() {
  const res = await api.get(API.GET_CHAT_LIST);
  return res;
}
