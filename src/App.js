import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
import './App.css';

const Message = ({ data }) => (<div>{data}</div>);

const App = ({ dispatch, text, messages }) => {
  React.useEffect(() => {
    axios.get('/messanger/getMessages')
      .then((res) => {
        dispatch(updateMessages(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSubmit = () => {
    dispatch(submitMessage());
  }

  const handleTextChange = (e) => {
    dispatch(handlTextChange(e.target.value));
  }
  return (
    <div className="App">
      <div>
        <div className="message-area">
          {messages.map((message, i) => <Message key={i} data={message} />)}
        </div>
      </div>
      <div>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messages,
    text: state.messageReducer.text,
  };
};

export default connect(mapStateToProps)(App);
