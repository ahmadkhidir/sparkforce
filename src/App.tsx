import { Route, Routes, useNavigate,useLocation } from "react-router-dom";
import Home from "./pages/home/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "./app/hooks";
import HomeAfterLogin from "./pages/home_after_login/HomeAfterLogin";
import SearchResults from "./pages/search_results/SearchResults";
import { Fragment, useEffect } from "react";
import CourseDetails from "./pages/course_details/CourseDetails";
// import WaitList from "./pages/waitlist/WaitList";

function App() {
  const navigate = useNavigate()
  const _loc = useLocation()
  const full_path = _loc.pathname + _loc.hash + _loc.search
  const isAuthenticated = useAppSelector(state => state.auth.authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(full_path)
    } else {
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    <Routes>
      {isAuthenticated
        ? <Fragment>
          <Route path="/" element={<HomeAfterLogin />} />
          <Route path="/search/:search" element={<SearchResults />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
        </Fragment>
        : <Fragment>
          <Route path="/" element={<Home />} />
        </Fragment>
      }
      {/* <Route path="/waitlist" element={<WaitList />} /> */}
    </Routes>
  )
}
export default App;
