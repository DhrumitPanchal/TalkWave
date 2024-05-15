import { useContext, useState } from "react";

import { Context } from "../Context/Context";

function UserInfo() {
  const [proEditable, setProEditable] = useState(false);
  const { user, setUser, updateUserDetails } = useContext(Context);

  const handelInput = (event) => {
    if (proEditable) {
      const name = event.target.name;
      const value = event.target.value;
      setUser({ ...user, [name]: value });
    }
  };
  return (
    <div className="relative py-[5rem] px-[6rem] flex flex-col gap-[4rem] h-[calc(100vh-4rem)]  w-full ">
      {proEditable && (
        <div
          onClick={() => {
            setProEditable(!proEditable);
            updateUserDetails();
          }}
          className="cursor-pointer absolute flex justify-center items-center rounded-[.2rem] top-[2rem] right-[8rem] h-[2rem] w-[5rem] text-[1.1rem] font-semibold text-white bg-blue-500"
        >
          Save
        </div>
      )}
      <div
        onClick={() => setProEditable(!proEditable)}
        className="cursor-pointer absolute flex justify-center items-center rounded-[.2rem] top-[2rem] right-[2rem] h-[2rem] w-[5rem] text-[1.1rem] font-semibold text-white bg-blue-500"
      >
        Edit
      </div>

      <div className="flex gap-[2.2rem] h-fit w-fit">
        <div className="relative  shadow-[6px_7px_14px_3px_rgba(0,0,0,0.2)] flex justify-center  h-[7rem] w-[7rem] rounded-full   ">
          <div className="absolute bottom-[1rem] -right-[.3rem] h-[1.6rem] w-[1.6rem] bg-blue-500 rounded-full" />
          <img className="w-full h-full rounded-full" src="" alt="" />
        </div>
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-[1.4rem] font-semibold">{user?.name}</h2>
          <h2 className="text-[1.2rem]">{user?.about}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-[2rem] text-[1.3rem]">
        <div className="flex w-full gap-[8rem]">
          {proEditable ? (
            <input
              required
              onChange={(e) => handelInput(e)}
              name="name"
              placeholder="Name"
              value={user?.name}
              className="w-full px-4 py-1 duration-300 bg-transparent border-b-[3px] border-blue-300 outline-none focus:border-blue-500"
            />
          ) : (
            <input
              onClick={() => setProEditable(true)}
              required
              onChange={(e) => handelInput(e)}
              name="name"
              placeholder="Name"
              value={user?.name}
              className="w-full px-4 py-1 duration-300 bg-transparent border-b-[3px] border-blue-100 outline-none"
              disabled
            />
          )}

          {proEditable ? (
            <input
              required
              onChange={(e) => handelInput(e)}
              name="email"
              placeholder="Email"
              value={user?.email}
              className="w-full px-4 py-1 duration-300 bg-transparent border-b-[3px] border-blue-300 outline-none focus:border-blue-500"
            />
          ) : (
            <input
              required
              onChange={(e) => handelInput(e)}
              name="email"
              placeholder="Email"
              value={user?.email}
              className="w-full px-4 py-1 duration-300 bg-transparent border-b-[3px] border-blue-100 outline-none"
              disabled
            />
          )}
        </div>

        <div>
          {proEditable ? (
            <input
              required
              onChange={(e) => handelInput(e)}
              name="about"
              placeholder="About"
              value={user?.about}
              className="w-full px-4 py-1 duration-300 bg-transparent border-b-[3px] border-blue-300 outline-none focus:border-blue-500"
            />
          ) : (
            <input
              required
              onChange={(e) => handelInput(e)}
              name="about"
              placeholder="About"
              value={user?.about}
              className="w-full px-4 py-1 duration-300 bg-transparent border-b-[3px] border-blue-100 outline-none"
              disabled
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
