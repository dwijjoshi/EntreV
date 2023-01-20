import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Actions/User";
import Post from "../post/Post";
import "./Discover.css";
import { format } from "timeago.js";
import Loading from "../loading/Loading";

const Discover = () => {
  const dispatch = useDispatch();

  const { loading, error, posts } = useSelector((state) => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, dispatch]);

  return loading === true ? (
    <Loading />
  ) : (
    <div className="discover">
      <div className="discoverLogo">Discover</div>
      <div className="discoverPosts">
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
          <div>No Posts to show</div>
        )}
      </div>
    </div>
  );
};

export default Discover;
