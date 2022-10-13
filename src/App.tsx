import { Route, Routes, useNavigate,useLocation } from "react-router-dom";
import Home from "./pages/home/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "./app/hooks";
import HomeAfterLogin from "./pages/home_after_login/HomeAfterLogin";
import SearchResults from "./pages/search_results/SearchResults";
import { Fragment, useEffect, useMemo } from "react";
import CourseDetails from "./pages/course_details/CourseDetails";
import E404 from "./pages/e404/E404";
// import WaitList from "./pages/waitlist/WaitList";

function App() {
  const navigate = useNavigate()
  const _loc = useLocation()
  const full_path = _loc.pathname + _loc.hash + _loc.search
  const isAuthenticated = useAppSelector(state => state.auth.authenticated)
  // useMemo(() => {
  //   if (!isAuthenticated) {
  //     navigate("/")
  //   } 
    // else {
      // navigate("/")
    // }
  // }, [isAuthenticated])

  return (
    <Routes>
      {isAuthenticated
      // All Authenticated route
        ? <Fragment>
          <Route path="/" element={<HomeAfterLogin />} />
          <Route path="/search/:search" element={<SearchResults />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
        </Fragment>
        // All None Authenticated route
        : <Fragment>
          <Route path="/" element={<Home />} />
        </Fragment>
      }
      {/* Genaral / Common Route */}
      {/* <Route path="/waitlist" element={<WaitList />} /> */}
      <Route path="*" element={<E404 />} />
    </Routes>
  )
}
export default App;
