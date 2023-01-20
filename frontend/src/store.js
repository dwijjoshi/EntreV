import { configureStore } from "@reduxjs/toolkit";
import {
  allPostsReducer,
  likeReducer,
  myPostReducer,
  userPostsReducer,
} from "./Reducers/Post";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";
const initialState = {};
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    like: likeReducer,
    myPosts: myPostReducer,
    allUsers: allUsersReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    allPosts: allPostsReducer,
  },
});

export default store;
