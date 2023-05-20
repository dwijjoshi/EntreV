import React, { useEffect } from "react";
import LeftBar from "./Components/leftbar/LeftBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Home from "./Components/home/Home";
import "./App.css";

import NewPost from "./Components/newpost/NewPost";
import Register from "./Components/register/Register";
import AccountNew from "./Components/accountnew/AccountNew";
import UserProfile from "./Components/userprofile/UserProfile";
import Search from "./Components/search/Search";
import Discover from "./Components/discover/Discover";
import Saved from "./Components/saved/Saved";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      <div className="app">
        {isAuthenticated && <LeftBar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/account"
            element={isAuthenticated ? <AccountNew /> : <Login />}
          />

          <Route
            path="/newpost"
            element={isAuthenticated ? <NewPost /> : <Login />}
          />

          <Route
            path="/register"
            element={isAuthenticated ? <AccountNew /> : <Register />}
          />

          <Route
            path="/user/:id"
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />

          <Route
            path="/search"
            element={isAuthenticated ? <Search /> : <Login />}
          />

          <Route
            path="/discover"
            element={isAuthenticated ? <Discover /> : <Login />}
          />

          <Route
            path="/saved"
            element={isAuthenticated ? <Saved /> : <Login />}
          />
        </Routes>

        {/* {isAuthenticated && <RightBar />} */}
      </div>
    </Router>
  );
};

export default App;
