import React from "react";
import "./LeftBar.css";
import { RssFeed } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExploreIcon from "@mui/icons-material/Explore";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const LeftBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="sidebarLogo">EntreV</div>
        </Link>

        <Link
          className="discoverSmall"
          to="/discover"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ExploreIcon />
        </Link>

        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>

          <Link
            to="/search"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <SearchIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Search</span>
            </li>
          </Link>
          <Link
            to="/newpost"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <AddCircleOutlineIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Post</span>
            </li>
          </Link>
          <Link
            to="/discover"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <ExploreIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Discover</span>
            </li>
          </Link>

          <Link
            to="/saved"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <BookmarkBorderIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Saved Posts</span>
            </li>
          </Link>
          {/* <li className="sidebarListItem">
            <BookmarkBorderIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Saved</span>
          </li> */}
          <Link
            to="/account"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <AccountCircleIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </li>
          </Link>
        </ul>
      </div>
      <div class="navbar">
        <Link to="/">
          <RssFeed />
        </Link>
        <Link to="/search">
          <SearchIcon />
        </Link>
        <Link to="/newpost">
          <AddCircleOutlineIcon />
        </Link>
        <Link to="/saved">
          <BookmarkBorderIcon />
        </Link>
        <Link to="/account">
          <AccountCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;
