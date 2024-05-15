import { useContext } from "react";
import { Context } from "../Context/Context";
import { FaTimes, FaCheck } from "react-icons/fa";
import NotificationListener from "./NotificationListener";
function Notification() {
  const { notifications, handelAddFriend } = useContext(Context);
  NotificationListener();
  return (
    <div className="relative py-[2rem] px-[4rem] flex flex-col gap-[4rem] h-[calc(100vh-4rem)]  w-full ">
      <h2 className="text-[1.6rem] text-blue-500 font-semibold">
        Notification
      </h2>

      <div className="flex flex-col gap-[1rem]">
        {notifications?.map((message) => {
          return message?.type === "request" ? (
            <div className="w-full flex items-center justify-between gap-[2rem] bg-blue-500/10 p-[1rem] rounded-[.6rem]">
              <div className="flex gap-[2rem] items-center">
                <img className="h-[4rem] w-[4rem] bg-slate-300 rounded-full" />
                <div>
                  <h2 className="text-[1.2rem] font-semibold">
                    {message?.requester?.name} <span>Requested to you</span>{" "}
                  </h2>
                  <h2>{message?.requester?.email} </h2>
                </div>
              </div>

              <div className="mr-[1rem] flex gap-[1.6rem]">
                <button
                  onClick={() => {
                    handelAddFriend(message?.requester?._id);
                  }}
                  className="flex justify-center items-center  rounded-[.4rem] h-[2.4rem] w-[2.4rem] bg-green-400 hover:bg-green-500"
                >
                  {" "}
                  <FaCheck className="text-[1.4rem] text-white" />
                </button>
                <button className="flex justify-center items-center  rounded-[.4rem] h-[2.4rem] w-[2.4rem] bg-red-400 hover:bg-red-500">
                  {" "}
                  <FaTimes className="text-[1.4rem] text-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-fit bg-blue-500/10 py-[1rem] px-[2rem] rounded-[.6rem]">
              <h2 className="text-[1.2rem] font-medium">{message?.msg}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notification;
