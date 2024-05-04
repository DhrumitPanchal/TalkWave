import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { Socket } from "../Context/SocketContext";
import notificationsound from "/notificationsound.mp3";
function MsgListener() {
  const { messages, setMessages } = useContext(Context);
  const { socket } = useContext(Socket);

  useEffect(() => {
    socket?.on("newMsg", (newMsg) => {
      const sound = new Audio(notificationsound);
      sound.play();
      setMessages([...messages, newMsg]);
    });

    return () => socket?.off("newMsg");
  }, [socket, setMessages, messages]);
}

export default MsgListener;
