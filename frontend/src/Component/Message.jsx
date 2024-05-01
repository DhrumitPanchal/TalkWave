import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Context/Context";
// import { useParams } from "react-router-dom";

function Message() {
  const { messages, user } = useContext(Context);
  const lastMessageRef = useRef();
  const [title, setTitle] = useState({
    Today: true,
    Yesterday: true,
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
  });
  function formatMsgTimeStamp(timeStamp) {
    const now = new Date();
    const messageDate = new Date(timeStamp);

    if (now - messageDate < 24 * 60 * 60 * 1000) {
      let data = [title?.Today, "Today"];
      title.Today && setTitle({ ...title, Today: false });
      return data;
    } else if (now - messageDate < 2 * 24 * 60 * 60 * 1000) {
      return [true, "Yesterday"];
    } else if (now - messageDate < 7 * 24 * 60 * 60 * 1000) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return [true, days[messageDate.getDay()]];
    } else if (now.getFullYear - messageDate.getFullYear() > 0) {
      return [
        true,
        messageDate.toLocaleDateString([], {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      ];
    } else {
      return [
        true,
        messageDate.toLocaleDateString([], {
          month: "short",
          day: "numeric",
        }),
        messageDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      ];
    }
  }

  const getTime = (timeStamp) => {
    const messageDate = new Date(timeStamp);

    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <>
      {messages.length < 1 ? (
        <div className="mx-auto flex justify-center w-full text-[1rem] ">
          <div className="px-[1rem] py-[.2rem] flex items-center tracking-[.2px] w-fit flex-col rounded-[.4rem] bg-blue-200 ">
            <h2>not have any messages</h2>
            <h2>send message to start conversation</h2>
          </div>
        </div>
      ) : (
        messages.map((msg) => (
          <>
            {formatMsgTimeStamp(msg?.createdAt)[0] && (
              <div className="mb-[2rem]  flex justify-center w-full ">
                <div className=" px-[1rem] py-[.2rem] rounded-[.4rem] bg-blue-500/50  ">
                  {formatMsgTimeStamp(msg?.createdAt)[1]}
                </div>
              </div>
            )}

            <div
              key={msg?._id}
              ref={lastMessageRef}
              className={`relative overflow-y-hidden max-w-[40rem] max-sm:max-w-[22rem] ${
                msg.senderId === user._id && "ml-auto"
              } text-[1.2rem] pl-[1.2rem] pr-[4.2rem] max-sm:pt-[.3rem] pt-[.3rem] pb-[.4rem] text-white  rounded-[1rem] ${
                msg.senderId === user._id
                  ? "rounded-tr-[0rem]"
                  : "rounded-tl-[0rem]"
              } w-fit bg-blue-500 mb-[1rem]`}
            >
              <div
                className={`w-full ${msg.senderId === user._id && "ml-auto"}`}
              >
                <p>{msg?.message}</p>
                <p className="absolute bottom-[.3rem] right-[.8rem] text-[.7rem]">
                  {getTime(msg?.createdAt)}
                </p>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
}

export default Message;
