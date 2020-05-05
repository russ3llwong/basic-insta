import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './redux/actions/authActions';
import PrivateRoute from './PrivateRoute';
import Feed from './pages/Feed';
import Profile from './pages/Profile'
import Post from './pages/Post';


import axios from "axios";
import {
    GET_ERRORS as GET_ERRORS_FEED,
    FETCH_POSTS_SUCCESS,
    //FETCH_USER_POSTS_SUCCESS,
    //POST_UPLOAD_SUCCESS
} from "./redux/actions/types";
import {
    FETCH_COMMENTS_SUCCESS,
    //ADD_COMMENT,
    GET_ERRORS as GET_ERRORS_COMMENT
} from './redux/actions/types';



const App = ({ dispatch }) => {

  // const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');
  const webSocket = new WebSocket('ws://localhost:4000/websocket');

  webSocket.onmessage = (message) => {
    const messageObject = JSON.parse(message.data);
    switch(messageObject.type) {
      case 'UPDATE_FEED':
        // TODO : REFACTOR
        // TODO: UPDATE FEED... make an axios request or something
        console.log('UPDATE POSTERS');
        axios
          .get('/basicgrams')
          .then(res => {
              console.log('successfully fetched posts', res.data);
              dispatch({
                  type: FETCH_POSTS_SUCCESS,
                  payload: res.data.basicgrams,
              })
          })
          .catch(err => {
              console.log(err);
              dispatch({
                  type: GET_ERRORS_FEED,
                  payload: err.response.data
              })
          });
          break;
      case 'UPDATE_COMMENT':
        // TODO: UPDATE COMMENT... make an axios request or something
        console.log('UPDATE COMMENT', messageObject.postId);
        axios
        .get(`/basicgrams/comment/post/${messageObject.postId}`)
        .then(res => {
          console.log(res.data)
            dispatch({
                type: FETCH_COMMENTS_SUCCESS,
                payload: res.data.comments,
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS_COMMENT,
                payload: err.response.data
            })
        });

        break;
      default:
        console.log('Unexpected message.');
    }
  };
  
  webSocket.onerror = e => {
    console.log(e);
  }


  if (localStorage.token){
    const token = localStorage.token;
    setAuthToken(token);
    dispatch(setCurrentUser(token))
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} /> 
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/feed/post" component={Post} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // messages: state.messageReducer.messages,
    // text: state.messageReducer.text,
  };
};

export default connect(mapStateToProps)(App);
