import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyContext from "./Context/Context";
import MySocket from "./Context/SocketContext";
import Settings from "./Component/Settings";
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
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Settings />} />
            </Route>
          </Routes>
        </MySocket>
      </MyContext>
    </BrowserRouter>
  );
}

export default App;
