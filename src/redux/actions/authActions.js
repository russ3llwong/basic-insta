import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/auth/create-user", newUser)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/auth/login", userData)
    .then(res => {
      // if ( res.err || res.error || !res.data.valid ) { //
      //   throw new Error("Error logging in")
      // }
      // console.log(res)

      const { token, userId } = res.data;
      // save as cookie
      document.cookie = `token=${token}`;
      document.cookie = `userId=${userId}`;
      // Save to localStorage
      // Set token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      // Set current user
      dispatch(setCurrentUser(token));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = token => {
  return {
    type: SET_CURRENT_USER,
    payload: token
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  // Remove cookies
  document.cookie = "userId=";
  document.cookie = "token=";
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};