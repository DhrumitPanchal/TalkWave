import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyContext from "./Context/Context";
function App() {
  return (
    <BrowserRouter>
      <MyContext>
        <ToastContainer />
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />} />
            <Route path=":id" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </MyContext>
    </BrowserRouter>
  );
}

export default App;
