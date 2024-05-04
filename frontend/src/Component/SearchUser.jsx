import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { Socket } from "../Context/SocketContext";
import { FaSistrix, FaUserPlus, FaTimes } from "react-icons/fa";
function SearchUser() {
  const { allUsers, searchMenu, setSearchMenu, handelAddFriend } =
    useContext(Context);
  const [users, setUsers] = useState(allUsers);
  const { onlineUsers } = useContext(Socket);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const isOnline = (id) => {
    return onlineUsers.includes(id);
  };

  const handelSearch = async () => {
    if (search === "") {
      return setUsers(allUsers);
    }
    const lowerSearch = search.toLowerCase();
    const result = await allUsers.filter((e) => {
      if (
        e.name.toLowerCase().includes(lowerSearch) ||
        e.email.toLowerCase().includes(lowerSearch)
      ) {
        return e;
      }
    });
    setUsers(result);
  };

  useEffect(() => {
    handelSearch();
  }, [search]);

  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-screen ">
      <div className="flex flex-col gap-[1.4rem] p-[1.4rem] h-[30rem] w-[34rem] rounded-[1rem] bg-white shadow-lg">
        <div className="flex gap-[1rem] w-full h-[2.4rem]">
          <div className="flex w-full h-[2.4rem]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="px-[1rem] h-[2.4rem] w-full text-[1.3rem] rounded-[.4rem] rounded-r-none border-r-0 border-[3px] border-black/50"
              type="text"
              placeholder="Search User"
            />
            <div className="flex justify-center items-center text-white text-[1.8rem] w-[6rem] rounded-[.4rem] rounded-l-none bg-blue-500">
              <FaSistrix />
            </div>
          </div>
          <div
            onClick={() => setSearchMenu(false)}
            className="flex justify-center items-center text-white text-[1.4rem] w-[2.6rem] rounded-[.4rem]  bg-red-300"
          >
            <FaTimes />
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {allUsers.length > 0 &&
            users?.map((user) => (
              <div
                key={user?._id}
                className="cursor-pointer px-[1rem] pb-[.8rem] py-[1rem] flex items-center justify-between gap-[1.2rem] border-b-[.1rem]  border-black/30"
              >
                <div className="flex gap-[1.4rem]">
                  <div className="relative">
                    {isOnline(user._id) && (
                      <div className="absolute bottom-[.4rem] right-0 h-[.8rem] rounded-full  w-[.8rem] bg-blue-500" />
                    )}

                    <img
                      className="h-[3.6rem] w-[3.6rem] rounded-full bg-white border-[1px] border-blue-700"
                      src=""
                      alt=""
                    />
                  </div>

                  <div>
                    <h1 className="text-[1.2rem] font-semibold">
                      {user?.name}
                    </h1>
                    <p className="text-[1rem]">
                      {user?.about ? user?.abou : user?.email}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => handelAddFriend(user?._id)}
                  className="cursor-pointer h-full p-[.6rem]  w-fit"
                >
                  <FaUserPlus className="text-[2rem]  transition-colors duration-200 text-blue-300 hover:text-blue-500" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchUser;
