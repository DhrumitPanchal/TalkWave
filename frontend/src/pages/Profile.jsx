import { useContext, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { SlUser } from "react-icons/sl";
// import { SlSettings } from "react-icons/sl";
// import { CiBellOn } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import { Context } from "../Context/Context";
function Profile() {
  const [proEditable, setProEditable] = useState(false);
  const { user, setUser, updateUserDetails } = useContext(Context);
  // const navigate = useNavigate();

  const handelInput = (event) => {
    if (proEditable) {
      const name = event.target.name;
      const value = event.target.value;
      setUser({ ...user, [name]: value });
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="flex w-full h-fit">
        <div className="py-[2.6rem] flex flex-col items-center justify-between h-screen w-[26rem] border-r-[3.5px] border-blue-500/10 ">
          <div className="flex flex-col gap-[3rem] w-full items-center ">
            <h2 className="text-[1.4rem] font-bold ">User Profile</h2>
            <div className="flex flex-col gap-[1rem] text-[1.2rem] font-semibold">
              <div className="cursor-pointer flex items-center gap-[1rem]">
                {/* <SlUser className="text-[2rem] ml-[.3rem] " /> */}
                <li className="w-full list-none ">User Info</li>
              </div>
              <div className="cursor-pointer flex items-center gap-[1rem]">
                <li className="list-none ">Setting</li>
              </div>
              <div className="cursor-pointer flex items-center gap-[1rem]">
                {/* <CiBellOn className="text-[2rem] w-[2.1rem] " /> */}
                <li className="list-none ">Notification</li>
              </div>
            </div>
          </div>

          <button className=" py-[.4rem] px-[.8rem] flex items-center justify-center gap-[.6rem] rounded-[.4rem] text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300">
            <RxExit className="text-[1rem] " />
            <h2 className="text-[1rem] font-medium">Log Out</h2>
          </button>
        </div>
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
      </div>
    </div>
  );
}

export default Profile;
