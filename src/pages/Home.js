import { useState } from "react";
import { ReactComponent as IconSearch } from "../assets/icons/icon-search.svg";
import ChatBox from "../components/ChatBox";
import MainMenu from "../components/MainMenu";

function Home() {
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <div className="bg-[#262626] h-screen w-screen flex">
      <div className="w-[285px]"></div>
      <div className="border-l border-l-[#F2F2F2] w-full flex flex-col">
        <div className="relative w-full h-5">
          <IconSearch className="absolute left-[26px] top-[19px]" fill="white"/>
          <input className="h-[58px] w-full bg-grey-1 px-12 text-white"></input>
        </div>
        <div className="flex flex-grow flex-col justify-end items-end px-[34px] py-[31px] gap-[19px]">
          {activeMenu && (
            <div className="bg-white w-[734px] h-[737px] rounded animation-slide-up">
              <ChatBox />
            </div>
          )}
          <MainMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
      </div>
    </div>
  );
}

export default Home;
