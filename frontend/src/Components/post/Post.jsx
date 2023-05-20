import React, { useEffect, useState } from "react";
import { MoreVert, DeleteOutline, Favorite } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import "./Post.css";
import { Dialog } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import {
  addCommentonPost,
  bookmarkPost,
  deletePost,
  likePost,
  showBookmark,
} from "../../Actions/Post";
import {
  getAllPosts,
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
  loadUser,
} from "../../Actions/User";
import User from "../user/User";
import CommentCard from "../commentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerId,
  ownerName,
  isDelete = false,
  isAccount = false,
  createAt,
}) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likes.length);
  const params = useParams();

  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const addCommentHandler = async (e) => {
    e.preventDefault();

    await dispatch(addCommentonPost(postId, commentValue));
    // if (isAccount) {
    //   dispatch(getMyPosts());
    // } else {
    //   dispatch(getFollowingPosts());
    // }

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
      dispatch(getUserPosts(params.id));
    }
  };

  const dispatch = useDispatch();

  const likeHandler = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));
    setLike(liked ? like - 1 : like + 1);

    // if (isAccount) {
    //   dispatch(getMyPosts());
    // } else {
    //   dispatch(getFollowingPosts());
    // }

    // alert.success("Liked");
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  const bookmarkHandler = async () => {
    setBookmark(!bookmark);
    await dispatch(bookmarkPost(postId));
    dispatch(getAllPosts());
    dispatch(showBookmark());
    dispatch(loadUser());
  };

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  useEffect(() => {
    user.bookmark.forEach((item) => {
      if (item === postId) {
        setBookmark(true);
      }
    });
  }, [user.bookmark, postId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={ownerImage} alt="User" className="postProfileImg" />
            <Link
              to={`/user/${ownerId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="postUsername">{ownerName}</span>
            </Link>
            <span className="postDate">{createAt}</span>
          </div>
          {isAccount ? (
            <div className="postTopRight">
              <MoreVert />
            </div>
          ) : null}
        </div>
        <div className="postCenter">
          <div className="postText">{caption}</div>

          <img src={postImage} alt="post" className="postCenterImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="postBottomdiv">
              {liked ? (
                <Favorite
                  className="postBottomIcon"
                  onClick={likeHandler}
                  style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderIcon
                  className="postBottomIcon"
                  onClick={likeHandler}
                />
              )}
              <span
                className="likeCount"
                onClick={() => {
                  setLikesUser(!likesUser);
                }}
              >
                {like} Likes
              </span>
            </div>
            <div className="postBottomdiv">
              <CommentIcon
                className="postBottomIcon"
                onClick={() => setCommentToggle(!commentToggle)}
              />
              <span
                className="likeCount"
                onClick={() => setCommentToggle(!commentToggle)}
              >
                {comments.length} Comment
              </span>
            </div>
            <div onClick={bookmarkHandler} className="postBottomdiv">
              {bookmark ? (
                <BookmarkIcon className="postBottomIcon" />
              ) : (
                <BookmarkBorderIcon className="postBottomIcon" />
              )}

              <span className="likeCount">Bookmark</span>
            </div>
            {/* <div className="postBottomdiv">
              <ShareIcon className="postBottomIcon" />
              <span className="likeCount">Share</span>
            </div> */}
            <div className="postBottomdiv">
              {isDelete ? (
                <DeleteOutline
                  className="postBottomIcon"
                  onClick={deletePostHandler}
                />
              ) : null}
              {isDelete ? <span className="likeCount">Delete</span> : null}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={likesUser}
        onClose={() => {
          setLikesUser(!likesUser);
        }}
      >
        <div className="DialogBox">
          <div className="likedBy">Liked By</div>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => {
          setCommentToggle(!commentToggle);
        }}
      >
        <div className="DialogBox">
          <div className="commentsHeading">Comments</div>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Add Comment here"
              required
            />

            <button type="submit" className="commentSubmit">
              Post
            </button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <div>No Comments Yet</div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
