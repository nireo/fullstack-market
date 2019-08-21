import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { createMessage } from '../../reducers/chatReducer';

const Chat = props => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!socket) {
      setSocket(io(':3001'));
    }
  }, []);

  const sendChatMessage = event => {
    event.preventDefault();
    if (message === '') {
      return null;
    }
    if (!socket) {
      return null;
    }
    socket.emit('message', message);
    props.createMessage({ from: 'anonymous', content: message });
  };

  if (props.chat === null) {
    return (
      <div class="container">
        <form onSubmit={sendChatMessage}>
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              value={message}
              onChange={({ target }) => setMessage(target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            submit
          </button>
        </form>
      </div>
    );
  }

  const renderMessage = props.chat.map(c => (
    <div>
      <li key={c.message}>
        <b>
          {c.form}: {c.content}
        </b>
      </li>
    </div>
  ));

  return (
    <div class="container" style={{ paddingTop: '2rem' }}>
      <form onSubmit={sendChatMessage}>
        <h3>Chat</h3>
        <ul>{renderMessage}</ul>
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chat: state.chat
  };
};

export default connect(
  mapStateToProps,
  { createMessage }
)(Chat);
