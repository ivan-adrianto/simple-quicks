import React, { useState } from "react";
import { ReactComponent as IconThunder } from "../assets/icons/icon-thunder.svg";
import { ReactComponent as IconChat } from "../assets/icons/icon-chat.svg";
import { ReactComponent as IconTaskList } from "../assets/icons/icon-task-list.svg";
import FloatingButton from "../components/FloatingButton";
import useFirstRender from "../hooks/useFirstRender";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../redux/actions/common";

function MainMenu() {
  const dispatch = useDispatch();

  const { activeMenu } = useSelector((state) => state.common);

  const [showMenu, setShowMenu] = useState(false);

  const firstRender = useFirstRender();

  return (
    <div className={"flex gap-[26px]"}>
      <div
        className={`${
          activeMenu === "task" ? "flex flex-row-reverse" : "flex"
        } ${!activeMenu ? "gap-[26px]" : "gap-[31px]"} ${
          showMenu && !firstRender && "animation-slide-left"
        } ${!showMenu && !firstRender && "animation-hide invisible"} ${
          !!activeMenu ? "animation-slide-right" : ""
        } ${firstRender && "hidden"}`}
      >
        <FloatingButton
          icon={
            <IconTaskList fill={activeMenu === "task" ? "white" : "#F8B76B"} />
          }
          className={`${activeMenu === "task" ? "bg-orange" : "bg-white"}`}
          onClick={() => dispatch(setActiveMenu("task"))}
          hasShadow={activeMenu === "task"}
        />
        <FloatingButton
          icon={<IconChat fill={activeMenu === "chat" ? "white" : "#8885FF"} />}
          className={`${activeMenu === "chat" ? "bg-purple" : "bg-white"}`}
          onClick={() => dispatch(setActiveMenu("chat"))}
          hasShadow={activeMenu === "chat"}
        />
      </div>
      {!activeMenu && (
        <FloatingButton
          className="bg-blue"
          icon={<IconThunder />}
          onClick={() => setShowMenu(!showMenu)}
        />
      )}
    </div>
  );
}

export default MainMenu;
