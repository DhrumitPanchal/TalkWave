import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { Socket } from "../Context/SocketContext";
import { toast } from "react-toastify";

function NotificationListener() {
  const {
    notifications,
    setNotifications,
    friends,
    setFriends,
  } = useContext(Context);
  const { socket } = useContext(Socket);

  useEffect(() => {
    socket?.on("newNotification", (sendRequest) => {
      notifications.length > 0
        ? setNotifications([...notifications, sendRequest])
        : setNotifications([sendRequest]);

      sendRequest.type === "request"
        ? toast(`${sendRequest?.requester?.name} requested to you`)
        : toast("new notification received");
    });

    socket?.on("requestaccepted", (newFriend) => {
      friends.length > 0
        ? setFriends([...friends, newFriend])
        : setFriends([newFriend]);
      console.log(newFriend);
      toast("accepted request");
    });

    return () => socket?.off("newMsg");
  }, [socket, notifications, setNotifications]);
}

export default NotificationListener;
