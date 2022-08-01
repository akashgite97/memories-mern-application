import "./App.css";
import React, { Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMessages } from "./constant/constant";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
const Header = React.lazy(() => import("./components/Header/Header"));
const Home = React.lazy(() => import("./components/Home/Home"));

function App() {
  const posts = useSelector((state) => state.posts);
  const user = useSelector(state =>state.auth);
  const error = posts.error || user.error
  return (
    <Suspense fallback={<CircularProgress />}>
      {error && toast.error(error !== "" ? error : errorMessages)}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route  exact path="/auth"  element={<Auth />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
