import { ReactComponent as IconSearch } from "../assets/icons/icon-search.svg";
import { ReactComponent as IconPerson } from "../assets/icons/icon-person.svg";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

function ChatList({ toDetail }) {
  const { data, loading } = useSelector((state) => state.chat.chatList);

  const dateFormatter = (string) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(string)
      .toLocaleDateString("id-ID", options)
      .replace(".", ":");
  };

  return (
    <div className="px-[34px] py-5 flex flex-col h-full">
      <div className="relative mb-1">
        <input
          type="text"
          className="rounded-[5px] border border-grey-2 py-[8px] pl-[58px] pr-[78px] w-full flex flex-col justify-center text-[12px] leading-3 placeholder:text-black"
          placeholder="Search"
        />
        <IconSearch
          fill="#333333"
          className="absolute right-[58px] top-[8px]"
        />
      </div>
      {loading ? (
        <div className="flex flex-col flex-grow justify-center items-center">
          <Spinner />
          <p className="mt-3 font-bold">Loading Chats...</p>
        </div>
      ) : (
        data?.map((item, index) => (
          <div
            key={index}
            className="pt-6 pb-8 border-b border-grey-2 flex justify-between items-center gap-2 cursor-pointer"
            onClick={() => toDetail(item)}
          >
            <div className="flex gap-[17px] ">
              <div className="relative">
                <div className="bg-grey-5 rounded-full flex justify-center items-center h-[34px] w-[34px] absolute left-0">
                  <IconPerson fill="rgba(0, 0, 0, 0.54)" />
                </div>
                <div className="bg-blue rounded-full flex justify-center items-center h-[34px] w-[34px] ml-[17px] relative z-10">
                  <IconPerson fill="white" />
                </div>
              </div>
              <div>
                <div className="flex gap-4 mb-1">
                  <p className="text-blue font-bold leading-[16px] text-[17px]">
                    {item.text}
                  </p>
                  <p className="text-sm leading-[14px]">
                    {dateFormatter(item.publishDate)}
                  </p>
                </div>
                <p className="font-bold text-sm">
                  {`${item.owner.firstName} ${item.owner.lastName}`}:
                </p>
                <p className="text-sm">Please check this out</p>
              </div>
            </div>
            {index === 0 && !localStorage.getItem("seen-new-msg-border") && (
              <div className="rounded-full bg-red w-[10px] h-[10px]"></div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ChatList;
