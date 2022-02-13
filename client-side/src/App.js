import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
function App() {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route  path="/" element={user ? <Home /> : <Register />} exact></Route>
      <Route path="/login" element={user ? <Navigate replace to="/" />:<Login />}></Route>
      <Route path="/register" element={user ? <Navigate replace to="/" />:<Register />}></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
      <Route path="/messenger" element={<Messenger />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
     );
}

export default App;
