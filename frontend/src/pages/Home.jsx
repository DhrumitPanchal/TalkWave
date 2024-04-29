import SideBar from "../Component/SideBar";
import Chat from "../Component/Chat";

function Home() {
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <Chat className="max-sm:hidden" />
    </div>
  );
}

export default Home;
