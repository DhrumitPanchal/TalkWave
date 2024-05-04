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
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchMenu, setSearchMenu] = useState(false);

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
        navigate("/");
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
      toast(data?.msg);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handelGetFriends = async () => {
    if (!user._id) return;
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/getfriends",
        { _id: user?._id }
      );
      setFriends(data?.friends);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/auth/users");
      const filterUser = data?.users.filter(
        (current) => current._id !== user._id
      );
      setAllUsers(filterUser);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handelGetMessages = async (receiverId) => {
    if (!receiverId || !user?._id) return;
    try {
      const { data } = await axios.post(
        `http://localhost:8000/message/get/${receiverId}`,
        {
          senderId: user._id,
          receiverId,
        }
      );

      setMessages(data?.messages);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handelAddFriend = async (friendId) => {
    console.log(user?._id);
    if (!friendId || !user?._id) return;
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/addfriends",
        {
          userId: user?._id,
          friendId,
        }
      );
      handelGetFriends();
      toast(data?.msg);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };
  const handelSendMessage = async (receiverId, message) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/message/send/${receiverId}`,
        {
          senderId: user._id,
          message,
        }
      );

      setMessages([...messages, data.newMessage]);
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
    handleGetAllUsers();
  }, []);
  useEffect(() => {
    handelGetFriends();
    handleGetAllUsers();
    handelGetMessages();
  }, [user]);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        allUsers,
        setAllUsers,
        proImg,
        searchMenu,
        setSearchMenu,
        messages,
        friends,
        setFriends,
        setMessages,
        setProImg,
        handleRegister,
        handleLogin,
        handelJwtLogin,
        updateUserDetails,
        handleGetAllUsers,
        handelGetMessages,
        handelSendMessage,
        handelAddFriend,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MyContext;
