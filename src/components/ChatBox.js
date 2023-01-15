import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chatDetailRequest, chatListRequest } from "../redux/actions/chats";
import ChatDetail from "./ChatDetail";
import ChatList from "./ChatList";

function ChatBox() {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("list");
  const [activeChat, setActiveChat] = useState("");

  useEffect(() => {
    dispatch(chatListRequest());
    // eslint-disable-next-line
  }, []);

  const toDetail = (item) => {
    setActiveView("detail");
    setActiveChat(item);
    dispatch(chatDetailRequest());
  };

  return activeView === "list" ? (
    <ChatList toDetail={toDetail} />
  ) : (
    <ChatDetail activeChat={activeChat} setActiveView={setActiveView} />
  );
}

export default ChatBox;
