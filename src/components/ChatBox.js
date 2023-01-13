import React, { useState } from "react";
import ChatDetail from "./ChatDetail";
import ChatList from "./ChatList";

function ChatBox() {
  const [activeView, setActiveView] = useState("list");

  return activeView === "list" ? (
    <ChatList toDetail={() => setActiveView("detail")} />
  ) : (
    <ChatDetail />
  );
}

export default ChatBox;
