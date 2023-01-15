import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as IconBack } from "../assets/icons/icon-back.svg";
import { ReactComponent as IconClose } from "../assets/icons/icon-close.svg";
import useClickOutside from "../hooks/useClickOutside";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  deleteChatRequest,
  editChat,
  sendChatRequest,
} from "../redux/actions/chats";
import {
  setActiveMenu,
  setToastMessage,
  setToaststatus,
} from "../redux/actions/common";
import { userId } from "../redux/services/api";
import Spinner from "./Spinner";

function ChatDetail({ activeChat, setActiveView }) {
  const dispatch = useDispatch();
  const { data, loading: loadingDetail } = useSelector(
    (state) => state.chat.chatDetail
  );
  const { loading: loadingSend } = useSelector((state) => state.chat.sendChat);

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState({});
  const [popupStyle, setPopupStyle] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [editedMessage, setEditedMessage] = useState({});

  const [showPopupNewMsg, setShowPopupNewMsg] = useLocalStorage(
    "new-message-popup",
    "initial"
  );
  const [seenNewMsgBorder, setSeenNewMsgBorder] = useLocalStorage(
    "seen-new-msg-border",
    false
  );

  const ref = useRef(null);
  useClickOutside(ref, () => setShowPopup({}));

  useEffect(() => {
    if (data) {
      const container = document.getElementById("chat-container");
      container.scrollTop = container.scrollHeight;
      if (showPopupNewMsg === "initial") {
        setTimeout(() => {
          setShowPopupNewMsg(true);
        }, 3000);
      }
    }
    // eslint-disable-next-line
  }, [data]);

  const submit = (event) => {
    event.preventDefault();
    if (!message) {
      return;
    }
    setMessage("");
    const data = {
      owner: userId,
      post: activeChat.id,
      message,
    };
    if (showEdit) {
      dispatch(
        editChat({
          itemIdx: editedMessage.itemIdx,
          message,
          id: editedMessage.id,
        })
      );
      setShowEdit(false);
    } else {
      dispatch(sendChatRequest(data));
    }
  };

  const openPopup = (event, chat, itemIdx) => {
    setShowPopup({
      status: chat.status,
      id: chat.id,
      itemIdx,
      message: chat.message,
    });
    setPopupStyle({
      left: event.clientX,
      top: event.clientY,
    });
  };

  const deleteChat = () => {
    if (loadingSend) {
      setShowPopup({});
      dispatch(
        setToastMessage("Cannot delete message. It is still being sent")
      );
      return;
    }
    dispatch(deleteChatRequest(showPopup.id));
    setShowPopup({});
  };

  const showNewMessageBorder = (index) => {
    // since there is no indicator from dummy api for unread message, we use the local storage to simulate unread message, and it will only appear once
    if (
      index === data?.length - 1 &&
      !seenNewMsgBorder &&
      activeChat.id === "60d21b4667d0d8992e610c85"
    ) {
      setTimeout(() => {
        setSeenNewMsgBorder(true);
      }, 3000);
      return true;
    }
    return false;
  };

  const onClickEdit = () => {
    if (loadingSend) {
      setShowPopup({});
      return dispatch(
        setToastMessage("Cannot edit message. It is still being sent")
      );
    }
    setMessage(showPopup.message);
    setEditedMessage(showPopup);
    setShowEdit(true);
    setShowPopup({});
  };

  const onCloseEdit = () => {
    setEditedMessage({});
    setShowEdit(false);
    setMessage("");
  };

  const onScrollContainer = () => {
    if (showPopup.status) {
      setShowPopup({});
    }
  };

  // copy text
  const copy = () => {
    navigator.clipboard.writeText(showPopup.message);
    setShowPopup({});
    dispatch(setToaststatus("success"));
    dispatch(setToastMessage("text copied to clipboard"));
  };

  const onClickNewMsg = () => {
    const anotherUserId = "63c2dc76d5cb090a7899314b";
    const data = {
      owner: anotherUserId,
      post: activeChat.id,
      message: "new message example",
    };
    // send new messages as another user to simulate new message
    dispatch(sendChatRequest(data));
    setShowPopupNewMsg(false);
  };

  const onClickBack = () => {
    setActiveView("list");
    setShowPopupNewMsg("initial");
  };

  const onClickClose = () => {
    dispatch(setActiveMenu(""));
    setShowPopupNewMsg("initial");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-grey-6 pl-[29px] pr-[21px] pt-5 pb-[18px] flex justify-between items-center">
        <div className="flex items-center gap-[18px]">
          <IconBack onClick={onClickBack} className="cursor-pointer" />
          <div>
            <p className="text-blue font-bold text-[17px]">{activeChat.text}</p>
            <p className="text-sm">3 Participants</p>
          </div>
        </div>
        <IconClose
          onClick={onClickClose}
          className="cursor-pointer"
          fill="#333333"
        />
      </div>
      <div
        className="pl-[29px] pr-[19px] py-3 flex-grow overflow-auto"
        id="chat-container"
        onScroll={onScrollContainer}
      >
        {loadingDetail ? (
          <div className="h-full w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          data?.map((item, itemIdx) => (
            <div key={itemIdx}>
              {showNewMessageBorder(itemIdx) && (
                <div className="flex justify-between items-center gap-3">
                  <div className="h-[1px] bg-red w-[272px]"></div>
                  <p className="font-bold text-red ">New Message</p>
                  <div className="h-[1px] bg-red w-[272px]"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="h-[1px] border-b border-black w-[217px]"></div>
                <p>{item.date}</p>
                <div className="h-[1px] border-b border-black w-60"></div>
              </div>
              {item.chats.map((chat, chatIdx) => (
                <div
                  className={`flex flex-col mb-2 ${
                    chat.status === "sent" ? "items-end" : "items-start"
                  } `}
                  key={`chat-${chatIdx}`}
                >
                  <p className={`${chat.textColor} font-bold mb-1`}>
                    {chat.name}
                  </p>
                  <div
                    className={`flex gap-2 relative ${
                      chat.status === "received" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p
                      className="leading-[11px] cursor-pointer"
                      onClick={(event) => openPopup(event, chat, itemIdx)}
                    >
                      ...
                    </p>
                    <div
                      className={`${chat.background} rounded-[5px] max-w-[411px] px-[10px] py-[6px]`}
                    >
                      <p className="mb-2">{chat.message}</p>
                      <div className="flex justify-between gap-2">
                        <p>{chat.time}</p>
                        {loadingSend && chatIdx === item.chats.length - 1 && (
                          <Spinner className={"w-3"} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      {showEdit && (
        <div className="bg-grey-6 w-[614px] mx-5 px-2 py-2 flex justify-between">
          <div>
            <p className="text-xs font-bold">Editing Message</p>
            <p className="text-xs">{editedMessage.message}</p>
          </div>
          <IconClose
            fill="white"
            onClick={onCloseEdit}
            className="cursor-pointer"
          />
        </div>
      )}
      <form
        onSubmit={submit}
        className={`flex gap-[13px] w-full px-5 ${
          showEdit ? "pb-[19px]" : "py-[19px]"
        }`}
      >
        <input
          type="text"
          className="placeholder:text-black rounded-[5px] px-4 py-3 border border-grey-2 h-10 w-full outline-none"
          placeholder="Type a new message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue rounded-[5px] text-white font-bold h-10 w-[76px] outline-none"
        >
          {showEdit ? "Edit" : "Send"}
        </button>
      </form>
      {showPopup.status === "sent" && (
        <div
          className="absolute bg-white w-[126px] border border-grey-6 rounded-[5px] left-[-66px] top-2 cursor-pointer"
          ref={ref}
          style={popupStyle}
        >
          <p
            className="h-10 text-blue border-b border-grey-6 pl-[18px] flex items-center"
            onClick={onClickEdit}
          >
            Edit
          </p>
          <p
            className="h-10 text-red pl-[18px] flex items-center"
            onClick={deleteChat}
          >
            Delete
          </p>
        </div>
      )}
      {showPopup.status === "received" && (
        <div
          className="absolute bg-white w-[126px] border border-grey-6 rounded-[5px] left-[-66px] top-2 cursor-pointer"
          ref={ref}
          style={popupStyle}
        >
          <p
            className="h-10 text-blue border-b border-grey-6 pl-[18px] flex items-center"
            onClick={copy}
          >
            Copy
          </p>
        </div>
      )}
      {showPopupNewMsg && showPopupNewMsg !== "initial" && (
        <div className="absolute px-3 bottom-[190px] flex justify-center w-[734px]">
          <div
            className="bg-blue-transparent flex justify-center items-center h-[34px]  w-[142px] px-3 rounded-[5px] cursor-pointer"
            onClick={onClickNewMsg}
          >
            <p className="text-blue font-bold ">New Message</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatDetail;
