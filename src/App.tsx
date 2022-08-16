import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "./app/hooks";
import HomeAfterLogin from "./pages/home_after_login/HomeAfterLogin";
// import WaitList from "./pages/waitlist/WaitList";

function App() {
  const isAuthenticated = useAppSelector(state=>state.auth.authenticated)
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <HomeAfterLogin /> : <Home />} />
      {/* <Route path="/waitlist" element={<WaitList />} /> */}
    </Routes>
  )
}
export default App;
