import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
//import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = ({ dispatch }) => {
  
  return (
    <div className="App">
       <Switch>
        <Route exact path="/" component={Login} /> 
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
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
