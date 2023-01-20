import React from "react";
import { Link, useParams } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import "./CommentCard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentonPost } from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
} from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentonPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
      dispatch(getUserPosts(params.id));
    }
  };
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <div className="commentName">{name}</div>
      </Link>
      <div className="commentBody">{comment}</div>
      {isAccount ? (
        <button className="commentDelete">
          <Delete onClick={deleteCommentHandler} />
        </button>
      ) : userId === user._id ? (
        <button className="commentDelete">
          <Delete onClick={deleteCommentHandler} />
        </button>
      ) : null}
    </div>
  );
};

export default CommentCard;
