import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import Message from "./Message";
import {
  FaArrowLeft,
  FaUserPlus,
  FaSistrix,
  FaEllipsisV,
  FaPlus,
  FaTelegramPlane,
} from "react-icons/fa";

function Chat() {
  const navigate = useNavigate();
  const { user, allUsers, handelGetMessages, handelSendMessage } =
    useContext(Context);
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [inputMsg, setInputMsg] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    handelSendMessage(id, inputMsg);
    setInputMsg("");
  };

  useEffect(() => {
    const findUser = allUsers?.filter((user) => user._id === id);
    setReceiver(findUser[0]);
    id && handelGetMessages(id);
  }, [id]);
  return (
    <>
      {!id ? (
        <div className="chatBox flex flex-col gap-[.2rem] justify-center items-center h-screen w-[76%]">
          <h2 className="text-[2rem] font-bold text-blue-500">
            Welcome 👋 {user?.name}
          </h2>
          <h2 className="text-[1.2rem] font-semibold text-black/90">
            Select chat to start messaging
          </h2>
        </div>
      ) : (
        <div className="chatBox h-screen w-[76%] max-sm:hidden">
          <div className="h-[11%] flex justify-between items-center px-[2rem] max-sm:px-[1rem] max-sm:h-[8%] bg-white ">
            <div className="flex items-center justify-between gap-[3rem] max-sm:gap-[1rem]">
              <div
                onClick={() => navigate(-1)}
                className=" hidden h-[2.2rem] w-[2.2rem] rounded-[.4rem] max-sm:flex justify-center items-center bg-blue-500"
              >
                <FaArrowLeft className="text-[1.4rem] text-white" />
              </div>
              <div className="flex items-center h-full gap-[1.4rem]">
                {receiver?.profilePic ? (
                  <img
                    className="h-[3.5rem] w-[3.5rem] bg-cover rounded-full border-[.2rem] border-blue-700"
                    src={receiver?.profilePic}
                    alt={receiver?.name}
                  />
                ) : (
                  <div className="relative overflow-hidden h-[3.5rem] w-[3.5rem] flex justify-center bg-cover rounded-full border-[.2rem] border-blue-700 bg-gray-300">
                    <div className="absolute h-6 w-6 top-2 rounded-full bg-white" />
                    <div className="absolute h-7 w-10 top-9 rounded-full bg-white" />
                  </div>
                )}
                <div className="h-full w-fit ">
                  <div className=" text-[1.2rem] font-semibold">
                    {receiver?.name}
                  </div>
                  <div className=" max-w-fit min-w-[1rem]">
                    {receiver?.about ? receiver?.about : receiver?.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-[1.6rem] text-[1.8rem] text-blue-950">
              <FaUserPlus className="transition-all duration-300 cursor-pointer hover:text-blue-600" />
              <FaSistrix className="transition-all duration-300 cursor-pointer hover:text-blue-600" />
              <FaEllipsisV className="transition-all duration-300 cursor-pointer hover:text-blue-600" />
            </div>
          </div>

          <div className="relative h-[89%] w-full max-sm:h-[92%]">
            <div className="overflow-y-scroll p-[2rem] pt-[2.4rem] max-sm:p-[1rem]  max-sm:h-[92.5%] h-[88.6%]  w-full ">
              <Message />
            </div>

            {/* --------------------   text box ------------------------ */}
            <form
              onSubmit={(e) => handelSubmit(e)}
              className="px-[2rem]  py-[.8rem] max-sm:px-[.8rem] flex items-center justify-between gap-[1.4rem] absolute bottom-[1rem] left-[2rem] max-sm:left-[1rem] max-sm:right-[1rem] right-[2rem] rounded-[.8rem] bg-white"
            >
              <div className="cursor-pointer h-[2.2rem] w-[2.2rem] rounded-[.4rem] flex justify-center items-center text-white bg-blue-500">
                <FaPlus />
              </div>
              <input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                type="text"
                className=" text-[1.4rem] w-[90%] max-sm:w-[78%]  text-blue-950"
                placeholder="Message.."
              />
              <button
                type="submit"
                className="cursor-pointer h-[2.2rem] w-[2.2rem] rounded-[.4rem] flex justify-center items-center text-white bg-blue-500"
              >
                <FaTelegramPlane />
              </button>
            </form>
            {/* --------------------   text box ------------------------ */}
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
