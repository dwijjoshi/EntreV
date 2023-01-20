import React, { useState, useContext, useEffect } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { getMyPosts } from "../../Actions/User";
import Loader from "../loading/Loading";
import Post from "../post/Post";
import { Dialog, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import User from "../user/User";

const Account = () => {
  const alert = useAlert();
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message } = useSelector((state) => state.like);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
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
    <Loader />
  ) : (
    <div className="profile">
      {/* <Topbar /> */}

      <div className="vertical"></div>
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img className="profileCoverImg" src="/assets/post/1.jpeg" />
            <img className="profileUserImg" src={user.avatar.url} />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.name}</h4>
            <span className="profileInfoDesc">Hello how are you</span>
          </div>
          <div className="followers">
            <div className="follower">{user.posts.length} Posts</div>
            <div
              className="follower"
              onClick={() => setFollowersToggle(!followersToggle)}
            >
              {user.followers.length} Followers
            </div>
            <div
              className="follower"
              onClick={() => setFollowingToggle(!followingToggle)}
            >
              {user.following.length} Following
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
                    // avatar={following.avatar.url}
                  />
                ))
              ) : (
                <Typography>You don't follow anyone.</Typography>
              )}
            </div>
          </Dialog>
        </div>

        <button className="followButton">
          Follow <Add />
        </button>

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
            />
          ))
        ) : (
          <p>No posts to show</p>
        )}

        <div className="profileRightBottom"></div>
      </div>
    </div>
  );
};

export default Account;
