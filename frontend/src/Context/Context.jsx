import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const Context = createContext(null);
function MyContext(props) {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    about: "",
    email: "",
    profilePic: "",
  });
  const [proImg, setProImg] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post("http://localhost:8000/auth/register", {
        name,
        email,
        password,
      });
      const result = data.user;
      setUser({
        _id: result?._id,
        name: result?.name,
        about: result?.about,
        email: result?.email,
        profilePic: result?.profilePic,
      });
      navigate("/");
      toast(data.msg);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`http://localhost:8000/auth/login`, {
        email,
        password,
      });
      const result = data.user;
      setUser({
        _id: result?._id,
        name: result?.name,
        about: result?.about,
        email: result?.email,
        profilePic: result?.profilePic,
      });
      Cookies.set("accessToken", data.access_Token, { expires: 365 });
      navigate("/");
      toast("sign in successfully");
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg);
    }
  };

  const handelJwtLogin = async () => {
    const token = Cookies.get("accessToken");

    try {
      if (token) {
        const { data } = await axios.post(`http://localhost:8000/auth/jwt`, {
          access_Token: token,
        });
        const result = data.user;
        setUser({
          _id: result?._id,
          name: result?.name,
          about: result?.about,
          email: result?.email,
          profilePic: result?.profilePic,
        });
      } else {
        navigate("/login");
      }
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const updateUserDetails = async () => {
    try {
      const { data } = await axios.put(`http://localhost:8000/auth/update`, {
        id: user?._id,
        data: {
          name: user?.name,
          about: user?.about,
          email: user?.email,
          profilePic: user?.profilePic,
        },
      });
      const result = data.user;
      setUser({
        _id: result?._id,
        name: result?.name,
        about: result?.about,
        email: result?.email,
        profilePic: result?.profilePic,
      });
      toast(result?.meg, {
        position: "top-center",
        theme: "colored",
      });
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    handelJwtLogin();
  }, []);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        proImg,
        setProImg,
        handleRegister,
        handleLogin,
        handelJwtLogin,
        updateUserDetails,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MyContext;
