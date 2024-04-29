import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div className="chatBox h-screen w-[76%] max-sm:w-full">
      <div className="h-[11%] flex justify-between items-center px-[2rem] max-sm:px-[1rem] max-sm:h-[8%] bg-white ">
        <div className="flex items-center justify-between gap-[3rem] max-sm:gap-[1rem]">
          <div
            onClick={() => navigate(-1)}
            className=" hidden h-[2.2rem] w-[2.2rem] rounded-[.4rem] max-sm:flex justify-center items-center bg-blue-500"
          >
            <FaArrowLeft className="text-[1.4rem] text-white" />
          </div>
          <div className="flex items-center gap-[1.4rem]">
            <img
              className="h-[3.5rem] w-[3.5rem] rounded-full border-[.2rem] border-blue-700"
              src=" "
              alt=""
            />
            <div>
              <h1 className="text-[1.2rem] font-semibold">Dhrumit</h1>
              <p>Lorem ipsum dolor sit amet.</p>
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
        <div className="overflow-y-scroll p-[2rem]  max-sm:h-[92.5%] h-[88.6%]  w-full ">
          {/* -------------------- message ----------------------- */}
          <div className="overflow-y-hidden max-w-[40rem] max-sm:max-w-full text-[1.4rem] px-[2rem] max-sm:pt-[1rem] pt-[.8rem] pb-[.8rem] text-white rounded-[1.4rem] rounded-tl-[0rem] w-fit bg-blue-700 mb-[1rem]">
            <h2 className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              earum laudantium dignissimos maxime qui excepturi voluptate error
              minima pariatur consequuntur!
            </h2>
          </div>

          <div className="overflow-y-hidden max-w-[40rem] max-sm:max-w-full ml-auto text-[1.4rem] px-[2rem] max-sm:pt-[1rem] pt-[.8rem] pb-[.8rem] text-white rounded-[1.4rem] rounded-tr-[0rem] w-fit bg-blue-500 mb-[1rem]">
            <h2 className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              earum laudantium dignissimos maxime qui excepturi voluptate error
              minima pariatur consequuntur!
            </h2>
          </div>
          {/* -------------------- message ----------------------- */}
        </div>

        {/* --------------------   text box ------------------------ */}
        <div className="px-[2rem] py-[.8rem] max-sm:px-[.8rem] flex items-center justify-between gap-[1.4rem] absolute bottom-[1rem] left-[2rem] right-[2rem] rounded-[.8rem] bg-white">
          <div className="cursor-pointer h-[2.2rem] w-[2.2rem] rounded-[.4rem] flex justify-center items-center text-white bg-blue-500">
            <FaPlus />
          </div>
          <input
            type="text"
            className=" text-[1.4rem] w-[90%] max-sm:w-[78%]  text-blue-950"
            placeholder="Message.."
          />
          <div className="cursor-pointer h-[2.2rem] w-[2.2rem] rounded-[.4rem] flex justify-center items-center text-white bg-blue-500">
            <FaTelegramPlane />
          </div>
        </div>
        {/* --------------------   text box ------------------------ */}
      </div>
    </div>
  );
}

export default Chat;
