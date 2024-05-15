import { useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="relative py-[2rem] px-[4rem] flex flex-col gap-[1rem] h-[calc(100vh-4rem)]  w-full ">
      <h2 className="text-[1.6rem] text-blue-500 font-semibold">Settings</h2>

      <div className="mt-[2rem] py-[1rem] px-[2rem] rounded-[.6rem] flex justify-between w-full  bg-blue-50">
        <h2 className="text-[1.4rem]">Dark Mode</h2>

        <div
          onClick={() => setDarkMode(!darkMode)}
          className={` cursor-pointer h-[2rem] px-[.2rem] flex items-center w-[3.8rem] rounded-[1rem] ${
            darkMode ? "bg-blue-500" : "bg-slate-300"
          } `}
        >
          <div
            className={`h-[1.6rem] ${
              darkMode && "ml-auto"
            } w-[1.6rem] rounded-full bg-white `}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
