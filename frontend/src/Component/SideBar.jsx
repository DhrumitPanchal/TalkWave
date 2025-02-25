import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";
import { Socket } from "../Context/SocketContext";
import { FaPlus } from "react-icons/fa";
// import { RxExit } from "react-icons/rx";
import SearchUser from "./SearchUser";

function SideBar() {
  const navigate = useNavigate();
  const { friends, searchMenu, setSearchMenu, user } = useContext(Context);
  const { onlineUsers } = useContext(Socket);
  const isOnline = (id) => {
    return onlineUsers.includes(id);
  };
  return (
    <>
      {searchMenu && <SearchUser />}
      <div className="relative h-full w-[24%] max-sm:w-full  text-blue-950">
        <div
          onClick={() => setSearchMenu(true)}
          className="absolute flex justify-center items-center bottom-[1.4rem] right-[1.4rem] h-[3.4rem] w-[3.4rem] rounded-br-none rounded-[.8rem] bg-blue-500"
        >
          <FaPlus className="text-[1.6rem] text-white" />
        </div>

        <div className="h-[11%] w-full flex justify-between items-center px-[1rem] bg-[#5f7ce9]">
          <h1 className="cursor-pointer text-[1.6rem] font-semibold text-white">
            TalkWave
          </h1>

          <img
            onClick={() => navigate("/profile/userinfo")}
            className="cursor-pointer h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[.2rem] border-blue-700"
            src={user?.profilePic}
            alt=""
          />
        </div>

        <div className="overflow-y-auto  flex flex-col  h-[89%] w-full ">
          {friends.length > 0 &&
            friends.map((user) => (
              <div
                key={user?._id}
                onClick={() => navigate(`/${user?._id}`)}
                className="cursor-pointer px-[1rem] pb-[.8rem] py-[1rem] flex items-center gap-[1.2rem] border-b-[.1rem] transition-all duration-300 hover:bg-blue-500/10 border-black/30"
              >
                <div className="relative">
                  {isOnline(user._id) && (
                    <div className="absolute bottom-[.4rem] right-0 h-[.8rem] rounded-full  w-[.8rem] bg-blue-500" />
                  )}

                  {user?.profilePic ? (
                    <img
                      className="h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[1px] border-blue-700"
                      src={user?.profilePic}
                      alt=""
                    />
                  ) : (
                    <div className="relative overflow-hidden h-[3.5rem] w-[3.5rem] flex justify-center bg-cover rounded-full border-[.2rem] border-blue-700 bg-gray-300">
                      <div className="absolute h-6 w-6 top-2 rounded-full bg-white" />
                      <div className="absolute h-7 w-10 top-9 rounded-full bg-white" />
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-[1.2rem] font-semibold">{user?.name}</h1>
                  <p className="text-[1rem]">
                    {user.about ? user?.about : user?.email}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SideBar;
