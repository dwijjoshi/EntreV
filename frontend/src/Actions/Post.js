import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const bookmarkPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "bookmarkRequest",
    });
    const { data } = await axios.post(`/api/v1/post/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "bookmarkSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "bookmarkFailure",
      payload: error.response.data.message,
    });
  }
};

export const showBookmark = () => async (dispatch) => {
  try {
    dispatch({
      type: "showBookmarkRequest",
    });
    const { data } = await axios.get(`/api/v1/bookmark`);

    dispatch({
      type: "showBookmarkSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "showBookmarkFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentonPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });
    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentonPost = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/comment/${postId}`, {
      data: { commentId },
    });

    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });
    const { data } = await axios.post(
      `/api/v1/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
