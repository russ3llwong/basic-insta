import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { insertMessage } from './redux/actions/messageActions';
import { BrowserRouter as Router } from 'react-router-dom';
import authReducer from './redux/reducers/authReducer';
import errorReducer from './redux/reducers/errorReducer';
import postReducer from './redux/reducers/postReducer'

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
  errors: errorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');


webSocket.onmessage = (message) => {
  const messageObject = JSON.parse(message.data);
  console.log(messageObject);
  switch(messageObject.type) {
    case 'UPDATE_FEED':
      // TODO: UPDATE FEED... make an axios request or something
      console.log('UPDATE FEED');
      break;
    case 'UPDATE_COMMENT':
      // TODO: UPDATE COMMENT... make an axios request or something
      console.log('UPDATE COMMENT', messageObject.postId);
      break;
    default:
      console.log('Unexpected message.');
  }
};

webSocket.onerror = e => {
  console.log(e);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
