import { useNavigate, useLocation, NavLink } from "react-router-dom";
import UserInfo from "../Component/UserInfo";
import { RxExit } from "react-icons/rx";
import Cookies from "js-cookie";
import Notification from "../Component/Notification";
import Settings from "../Component/Settings";
function Profile() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handelLogOut = () => {
    navigate("/login");
    return Cookies.remove("accessToken");
  };
  return (
    <>
      <div className="w-full h-screen">
        <div className="flex w-full h-fit">
          
          <div className="py-[2.6rem] flex flex-col items-center justify-between h-screen w-[26rem] border-r-[3.5px] border-blue-500/10 ">
            <div className="flex flex-col gap-[3rem] w-full items-center ">
              <h2 className="text-[1.4rem] font-bold ">User Profile</h2>
              <div className="flex flex-col gap-[1rem] text-[1.2rem] font-semibold">
                <NavLink
                  to={"/profile/userinfo"}
                  onClick={() => navigate("/profile/userinfo")}
                  className="cursor-pointer flex items-center gap-[1rem]"
                >
                  {/* <SlUser className="text-[2rem] ml-[.3rem] " /> */}
                  <li className="w-full list-none ">User Info</li>
                </NavLink>
                <NavLink
                  to={"/profile/setting"}
                  className="cursor-pointer flex items-center gap-[1rem]"
                >
                  <li className="list-none ">Setting</li>
                </NavLink>
                <NavLink
                  to={"/profile/notification"}
                  className="cursor-pointer flex items-center gap-[1rem]"
                >
                  {/* <CiBellOn className="text-[2rem] w-[2.1rem] " /> */}
                  <li className="list-none ">Notification</li>
                </NavLink>
              </div>
            </div>

            <button
              onClick={() => handelLogOut()}
              className=" py-[.4rem] px-[.8rem] flex items-center justify-center gap-[.6rem] rounded-[.4rem] text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300"
            >
              <RxExit className="text-[1rem] " />
              <h2 className="text-[1rem] font-medium">Log Out</h2>
            </button>
          </div>
          {pathname === "/profile/userinfo" && <UserInfo />}
          {pathname === "/profile/setting" && <Settings />}
          {pathname === "/profile/notification" && <Notification />}
        </div>
      </div>
    </>
  );
}

export default Profile;
