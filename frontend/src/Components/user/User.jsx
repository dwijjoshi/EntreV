import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { followAndUnfollowUser } from "../../Actions/User";

const User = ({ userId, name, avatar }) => {
  const dispatch = useDispatch();
  const followUser = (userId) => {
    dispatch(followAndUnfollowUser(userId));
  };
  return (
    <div className="flex items-center justify-between ">
      <Link
        to={`/user/${userId}`}
        className="homeUser"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <div className="flex items-center">
          <Avatar
            src={avatar}
            alt={name}
            sx={{ height: "4.5vmax", width: "4.5vmax", margin: "10px" }}
          />

          <div>{name}</div>
        </div>
      </Link>
      <div
        className="flex bg-blue-500 px-2 py-1.5 rounded-lg cursor-pointer ml-2"
        onClick={() => followUser(userId)}
      >
        <div className="text-white">Follow</div>
      </div>
    </div>
  );
};

export default User;
