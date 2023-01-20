import { Avatar, Dialog, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";

import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";

import Post from "../post/Post";

import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";
import User from "../user/User";
import Loading from "../loading/Loading";

const UserProfile = () => {
  const alert = useAlert();
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const { user: me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const params = useParams();

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch, userError, followError]);
  return loading === true || userLoading === true ? (
    <Loading />
  ) : (
    <div className="account">
      <div className="accountWrapper">
        {user && (
          <>
            <div className="accountTop">
              <div className="accountTopLeft">
                <Avatar
                  src={user.avatar.url}
                  sx={{ height: "130px", width: "130px" }}
                />
              </div>
              <div className="accountTopRight">
                <div className="topRightHeaderProfile">
                  <div className="userName">{user.name}</div>
                  {myProfile ? null : (
                    <button
                      className="editProfile"
                      onClick={followHandler}
                      disabled={followLoading}
                      style={{
                        background: following ? "black" : "blue",
                      }}
                    >
                      {following ? "Unfollow" : "Follow"}
                    </button>
                  )}
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
          </>
        )}
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

export default UserProfile;
