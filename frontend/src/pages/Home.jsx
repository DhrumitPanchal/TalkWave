import SideBar from "../Component/SideBar";
import Chat from "../Component/Chat";
import Notification from "../Component/Notification";
function Home() {
  Notification();
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <Chat className="max-sm:hidden" />
    </div>
  );
}

export default Home;
