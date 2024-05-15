import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyContext from "./Context/Context";
import MySocket from "./Context/SocketContext";
function App() {
  return (
    <BrowserRouter>
      <MyContext>
        <MySocket>
          <ToastContainer />
          <Routes>
            <Route path="/">
              <Route path="" element={<Home />} />
              <Route path=":id" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="profile/userinfo" element={<Profile />} />
              <Route path="profile/setting" element={<Profile />} />
              <Route path="profile/notification" element={<Profile />} />
            </Route>
          </Routes>
        </MySocket>
      </MyContext>
    </BrowserRouter>
  );
}

export default App;
