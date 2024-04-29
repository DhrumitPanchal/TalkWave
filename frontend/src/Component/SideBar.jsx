import { useNavigate } from "react-router-dom";
// import { RxExit } from "react-icons/rx";

function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-[24%] max-sm:w-full max-sm:hidden  text-blue-950">
      <div className="h-[11%] flex justify-between items-center px-[1rem] bg-[#5f7ce9]">
        <h1 className="cursor-pointer text-[1.6rem] font-semibold text-white">
          TalkWave
        </h1>

        <img
          onClick={() => navigate("/profile")}
          className="cursor-pointer h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[.2rem] border-blue-700"
          src={"./images/Mobile login-bro.svg"}
          alt=""
        />
      </div>

      <div className="overflow-y-auto p-[1rem] flex flex-col gap-[1rem] h-[89%]  w-full ">
        <div className="cursor-pointer pb-[.8rem] flex items-center gap-[1.2rem] border-b-[.1rem] border-black/30">
          <img
            className="h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[.2rem] border-blue-700"
            src=""
            alt=""
          />
          <div>
            <h1 className="text-[1.2rem] font-semibold">Dhrumit</h1>
            <p className="text-[1rem]">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="cursor-pointer pb-[.8rem] flex items-center gap-[1.2rem] border-b-[.1rem] border-black/30">
          <img
            className="h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[.2rem] border-blue-700"
            src=""
            alt=""
          />
          <div>
            <h1 className="text-[1.2rem] font-semibold">Dhrumit</h1>
            <p className="text-[1rem]">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
