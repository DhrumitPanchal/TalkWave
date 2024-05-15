import { createContext, useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import io from "socket.io-client";

export const Socket = createContext(null);

function MySocket(props) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: user?._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <Socket.Provider value={{ socket, onlineUsers }}>
      {props.children}
    </Socket.Provider>
  );
}

export default MySocket;
