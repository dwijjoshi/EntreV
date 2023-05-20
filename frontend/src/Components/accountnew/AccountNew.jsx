import { Avatar } from "@mui/material";

import "./AccountNew.css";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getMyPosts, logoutUser } from "../../Actions/User";

import Post from "../post/Post";
import { Dialog, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import User from "../user/User";
import Loading from "../loading/Loading";
import { format } from "timeago.js";

const AccountNew = () => {
  const alert = useAlert();
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message } = useSelector((state) => state.like);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch, likeError]);
  return loading === true || userLoading === true ? (
    <Loading />
  ) : (
    <div className="account">
      <div className="accountWrapper">
        <div className="accountTop">
          <div className="accountTopLeft">
            <Avatar
              src={user.avatar.url}
              className="accountAvatar"
              sx={{ height: "90px", width: "90px" }}
            />
          </div>
          <div className="accountTopRight">
            <div className="topRightHeader">
              <div className="userName">{user.name}</div>
              <div className="topRightHeaderOptions">
                <button className="editProfile">Edit Profile</button>
                <button className="editProfile" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </div>
            <div className="topRightFollow">
              <div>{user.posts.length} Posts</div>
              <div onClick={() => setFollowersToggle(!followersToggle)}>
                {user.followers.length} Followers
              </div>
              <div onClick={() => setFollowingToggle(!followingToggle)}>
                {user.following.length} Following
              </div>
            </div>
            {/* <div className="accountDescription">Hello my name is Dwij</div> */}
          </div>
        </div>
        <Dialog
          open={followersToggle}
          onClose={() => {
            setFollowersToggle(!followersToggle);
          }}
        >
          <div className="DialogBox">
            <div>Followers</div>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography>You don't have any followers.</Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => {
            setFollowingToggle(!followingToggle);
          }}
        >
          <div className="DialogBox">
            <div>Following</div>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography>You don't follow anyone.</Typography>
            )}
          </div>
        </Dialog>
      </div>
      <div className="accountPosts">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
              createAt={format(post.createAt)}
            />
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default AccountNew;
