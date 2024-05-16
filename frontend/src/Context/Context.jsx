import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const Context = createContext(null);
const baseUrl = import.meta.env.VITE_API_BACKENDURL;

function MyContext(props) {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    about: "",
    email: "",
    profilePic: "",
  });
  const formData = new FormData();
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchMenu, setSearchMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/register`, {
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
      setNotifications(result?.notification);
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
      const { data } = await axios.post(`${baseUrl}/auth/login`, {
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
      setNotifications(result?.notification);
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
        const { data } = await axios.post(`${baseUrl}/auth/jwt`, {
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
        setNotifications(result?.notification);

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
      const { data } = await axios.put(`${baseUrl}/auth/update`, {
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
      const { data } = await axios.post(`${baseUrl}/auth/getfriends`, {
        _id: user?._id,
      });
      setFriends(data?.friends);
    } catch ({ response }) {
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handelUploadProfileImage = async () => {
    console.log(formData);
    try {
      const response = await axios.post(`${baseUrl}/auth/upload`, formData);
      console.log("check img url : " + response?.data?.ProfilePicUrl);

      await axios.put(`${baseUrl}/auth/update`, {
        id: user?._id,
        data: {
          profilePic: response?.data?.ProfilePicUrl,
        },
      });
      setUser({ ...user, profilePic: response?.data?.ProfilePicUrl });
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
      const { data } = await axios.get(`${baseUrl}/auth/users`);
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
        `${baseUrl}/message/get/${receiverId}`,
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
      const { data } = await axios.post(`${baseUrl}/auth/addfriends`, {
        userId: user?._id,
        friendId,
      });
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
        `${baseUrl}/message/send/${receiverId}`,
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

  const handelSendFriendRequest = async (friendId) => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/sendfriendrequest`, {
        userId: user._id,
        friendId,
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
        searchMenu,
        setSearchMenu,
        messages,
        friends,
        notifications,
        formData,
        setNotifications,
        setFriends,
        setMessages,
        handleRegister,
        handleLogin,
        handelJwtLogin,
        updateUserDetails,
        handleGetAllUsers,
        handelGetMessages,
        handelSendMessage,
        handelAddFriend,
        handelSendFriendRequest,
        handelUploadProfileImage,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MyContext;
