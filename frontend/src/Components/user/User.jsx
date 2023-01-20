import { Avatar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const User = ({ userId, name, avatar }) => {
  return (
    <Link
      to={`/user/${userId}`}
      className="homeUser"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={avatar}
          alt={name}
          sx={{ height: "5vmax", width: "5vmax", margin: "10px" }}
        />

        <Typography>{name}</Typography>
      </div>
    </Link>
  );
};

export default User;
