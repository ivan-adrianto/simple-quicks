import React, { useState } from "react";
import { ReactComponent as IconSearch } from "../assets/icons/icon-search.svg";
import { ReactComponent as IconThunder } from "../assets/icons/icon-thunder.svg";
import { ReactComponent as IconChat } from "../assets/icons/icon-chat.svg";
import { ReactComponent as IconTaskList } from "../assets/icons/icon-task-list.svg";
import FloatingButton from "../components/common/FloatingButton";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-[#262626] h-screen w-screen flex relative">
      <div className="w-[285px]"></div>
      <div className="border-l border-l-[#F2F2F2] w-full">
        <div className="relative w-full flex ">
          <IconSearch className="absolute left-[26px] top-[19px]" />
          <input className="h-[58px] w-full bg-grey-1 px-12 text-white"></input>
        </div>
        <div className="fixed bottom-[27px] right-[34px] flex gap-[26px]">
          <div
            className={`flex gap-[26px] ${
              showMenu ? "animation-slide-left " : "animation-slide-right invisible"
            }`}
          >
            <FloatingButton
              icon={<IconTaskList fill="#F8B76B" />}
              className="bg-white"
            />
            <FloatingButton
              icon={<IconChat fill="#8885FF" />}
              className="bg-white"
            />
          </div>
          <FloatingButton
            className="bg-blue"
            icon={<IconThunder />}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
