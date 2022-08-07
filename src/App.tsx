import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WaitList from "./pages/waitlist/WaitList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waitlist" element={<WaitList />} />
    </Routes>
  )
}
export default App;
