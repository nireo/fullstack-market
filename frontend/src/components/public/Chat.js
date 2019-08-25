import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { createMessage } from '../../reducers/chatReducer';
import { Link } from 'react-router-dom';

const Chat = props => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState(null);
  const [peopleInChat, setPeopleInChat] = useState(0);
  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:3001'));
    }
    if (socket) {
      socket.on('sent message', data => {
        props.createMessage(data);
      });

      socket.on('typing', data => {
        setTyping(data);
      });

      socket.on('stopped typing', () => {
        setTyping(null);
      });

      socket.on('user joined', data => {
        setPeopleInChat(data);
      });

      socket.on('user left', data => {
        setPeopleInChat(data);
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
    socket.emit('message', {
      from: props.user.username,
      content: message,
      userId: props.user._id
    });
    socket.emit('stopped typing', null);
    props.createMessage({
      from: props.user.username,
      content: message,
      userId: props.user._id
    });
    setMessage('');
  };

  const renderMessages = props.chat.map(c => {
    return (
      <li className="media" key={c.message} style={{ paddingBottom: '1rem' }}>
        <div className="media-body">
          <h6 className="media-heading" style={{ marginBottom: '0rem' }}>
            <Link to={`/profile/${c.userId}`}>@{c.from}</Link>
          </h6>
          {c.content}
        </div>
      </li>
    );
  });

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <form onSubmit={sendChatMessage}>
        <h3>Chat</h3>
        <p>People in chat {peopleInChat}</p>
        <ul className="list-unstyled">{renderMessages}</ul>
        {typing && <p>{typing}</p>}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Send Message
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
