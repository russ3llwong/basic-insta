import axios from "axios";
import {
    GET_ERRORS,
    FETCH_POSTS_SUCCESS,
    FETCH_USER_POSTS_SUCCESS,
    POST_UPLOAD_SUCCESS
} from "./types";


export const uploadPost = (caption, file) => (dispatch) => {
    let formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios
    .post('/basicgrams/new', formData, config)
    .then(res => {
      dispatch({
        type: POST_UPLOAD_SUCCESS,
        payload: res.newBasicgram,
      });
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
  }

export const fetchAllPosts = () => (dispatch) => {
    return axios
        .get('/basicgrams')
        .then(res => {
            console.log('successfully fetched posts', res.data);
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: res.data.basicgrams,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const fetchPostsByUserId = (userId) => (dispatch) => {
    return axios
        .get(`/basicgrams/user/${userId}`)
        .then(res => {
            dispatch({
                type: FETCH_USER_POSTS_SUCCESS,
                payload: res.data.basicgrams,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}