import { useState } from "react";
import { FaRegEnvelope, FaGoogle } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";

import { Link } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    Email: "",
    Password: "",
  });

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: [e.target.value] });
  };
  // const FormSubmit = (e) => {
  // SingIn(...userData.Email, ...userData.Password);
  // };
  return (
    <div className="max-sm:pt-[6rem] flex justify-center items-center max-sm:flex-col gap-[2rem] h-screen max-sm:h-full  w-full text-blue-900">
      <img
        className="h-[40rem] max-sm:h-[20rem] "
        src="./images/Mobile login-pana.svg"
        alt=""
      />
      <div className="flex max-sm:w-full max-sm:px-[4rem] flex-col gap-[1.2rem]">
        <div>
          <h1 className="text-[2rem] font-semibold text-blue-900">
            Welcome back!
          </h1>
          <h3 className="text-[1.1rem] text-black/60">
            {"Let's login for explore continues"}
          </h3>
        </div>
        <div className="max-sm:w-full flex flex-col gap-[.8rem] w-[20rem]">
          <div className="flex items-center px-[1rem] gap-[1rem] text-[1.2rem] rounded-[1.4rem] text-blue-950 bg-blue-100/50">
            <FaRegEnvelope className="text-[1.4rem]" />
            <input
              name="Email"
              type="email"
              onChange={(e) => handleInput(e)}
              value={userData.Email}
              className="py-[.6rem] bg-transparent placeholder:text-blue-900/70"
              placeholder="enter email"
            />
          </div>

          <div className="flex items-center px-[1rem] gap-[1rem] text-[1.2rem] rounded-[1.4rem] text-blue-950 bg-blue-100/50">
            <BiLockAlt className="text-[1.4rem]" />
            <input
              name="Password"
              type="text"
              onChange={(e) => handleInput(e)}
              value={userData.Password}
              className="py-[.6rem] bg-transparent placeholder:text-blue-900/70"
              placeholder="enter password"
            />
          </div>

          <button className=" px-[1rem] py-[.6rem] rounded-[1.4rem] text-[1rem] font-semibold text-white bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-700 transition-all duration-1000">
            Sign up
          </button>

          <div>
            <div className="my-[1rem] flex justify-center items-center h-[.1rem] w-full bg-black/60">
              <h1 className="px-[.4rem] text-[1.1rem] text-black/60 leading-[.6rem] bg-white">
                You can Connect with
              </h1>
            </div>
          </div>
          <button className="flex justify-center items-center px-[1rem] py-[.6rem] rounded-[1.4rem] text-[1rem] font-semibold border-[.2rem] border-blue-500  hover:text-white hover:bg-gradient-to-b from-blue-500 to-blue-700 transition-all duration-300">
            <FaGoogle className="mr-[.5rem] text-[1.2rem]" />
            Sign Up with Google
          </button>
          <h1 className="mt-[.4rem] text-[1.2rem] text-center">
            {"Don't have an account?"}
            <Link to="/Register" className="text-blue-500">
              Sign Up
            </Link>{" "}
            here
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
