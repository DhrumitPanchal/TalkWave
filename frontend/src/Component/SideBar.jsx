import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";
// import { RxExit } from "react-icons/rx";

function SideBar() {
  const navigate = useNavigate();
  const { allUsers } = useContext(Context);
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

      <div className="overflow-y-auto  flex flex-col  h-[89%] w-full ">
        {allUsers.length > 0 &&
          allUsers.map((user) => (
            <div
              key={user?._id}
              onClick={() => navigate(`/${user?._id}`)}
              className="cursor-pointer px-[1rem] pb-[.8rem] py-[1rem] flex items-center gap-[1.2rem] border-b-[.1rem] transition-all duration-300 hover:bg-blue-500/10 border-black/30"
            >
              <img
                className="h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[.2rem] border-blue-700"
                src=""
                alt=""
              />
              <div>
                <h1 className="text-[1.2rem] font-semibold">{user?.name}</h1>
                <p className="text-[1rem]">{user?.about}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SideBar;
