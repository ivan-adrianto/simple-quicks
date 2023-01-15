import api from "./api";
import { API } from "./urls";

export async function chatList() {
  const res = await api.get(API.GET_CHAT_LIST, { params: { limit: 4 } });
  return res;
}

export async function chatDetail() {
  const res = await api.get(API.GET_CHAT_DETAIL);
  return res;
}

export async function sendChat(data) {
  const res = await api.post(API.SEND_CHAT, data);
  return res;
}

export async function deleteChat(id) {
  const res = await api.delete(`${API.DELETE_CHAT}/${id}`);
  return res;
}
