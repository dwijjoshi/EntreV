import React, { useEffect } from "react";
import Post from "../post/Post";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import { format } from "timeago.js";

import { useAlert } from "react-alert";
import Loading from "../loading/Loading";
import User from "../user/User";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { error: likeError, message } = useSelector((state) => state.like);

  const { users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
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

  return (
    <div className="home">
      <div className="feed">
        {loading ? (
          <Loading />
        ) : posts && posts.length > 0 ? (
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
          <div className="text-center mt-10 text-2xl">No post yet</div>
        )}
      </div>
      <div className="allUsers">
        <div className="suggestedAccounts">Suggested Accounts</div>
        <div className="users">
          {users &&
            users.map((user) => (
              <User
                userId={user._id}
                key={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
