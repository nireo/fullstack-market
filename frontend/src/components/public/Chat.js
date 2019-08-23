import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { createMessage } from '../../reducers/chatReducer';

const Chat = props => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState(null);
  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:3001'));
    }
    if (socket) {
      socket.on('sent message', data => {
        props.createMessage(data);
      });
    }
    if (socket) {
      socket.on('typing', data => {
        setTyping(data);
      });
    }
    if (socket) {
      socket.on('stopped typing', () => {
        setTyping(null);
      });
    }
  }, [socket, props]);

  const handleChange = event => {
    event.preventDefault();
    socket.emit('typing', props.user.username);
    setMessage(event.target.value);
  };

  const sendChatMessage = event => {
    event.preventDefault();
    if (message === '') {
      return null;
    }
    if (!socket) {
      return null;
    }
    socket.emit('message', { from: props.user.username, content: message });
    socket.emit('stopped typing', null);
    props.createMessage({ from: props.user.username, content: message });
    setMessage('');
  };

  const renderMessages = props.chat.map(c => {
    return (
      <li key={c.message}>
        <b>
          {c.from}: {c.content}
        </b>
      </li>
    );
  });

  return (
    <div class="container" style={{ paddingTop: '2rem' }}>
      <form onSubmit={sendChatMessage}>
        <h3>Chat</h3>
        <hr />
        <ul style={{ listStyleType: 'none' }}>{renderMessages}</ul>
        <hr />
        {typing && <p>{typing}</p>}
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            value={message}
            onChange={handleChange}
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
    chat: state.chat,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { createMessage }
)(Chat);
