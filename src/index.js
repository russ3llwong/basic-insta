import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import postReducer from './redux/reducers/postReducer'
import commentReducer from './redux/reducers/commentReducer'
import authReducer from './redux/reducers/authReducer';
import errorReducer from './redux/reducers/errorReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
  errors: errorReducer,
  comment: commentReducer,
  comments: commentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

// export const getAllPosts = (state) => {
//   return postReducer.getAllPosts(state.posts);
// };

// export const getPostById = (state, id) => {
//   return postReducer.getPostById(state.posts, id);
// };

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
