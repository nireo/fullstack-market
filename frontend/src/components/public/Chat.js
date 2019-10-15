import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { createMessage } from "../../reducers/chatReducer";
import { Link } from "react-router-dom";

let socket;

const Chat = props => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // connect the socket
    socket = io("localhost:3001");

    // so that anyone can use the chat
    // if they aren't logged in add them as anonymous
    if (props.user) {
      const userObject = {
        username: props.user.username,
        id: props.user._id
      };
      socket.emit("join", userObject);
    } else {
      socket.emit("join", {
        username: `anonymous${Math.floor(Math.random() * 100)}`,
        id: `${Math.floor(Math.random() * 100)}`
      });
    }
  }, [socket, props]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("chatData", data => {
      setUsers(data);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages, users]);

  const handleChange = event => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const sendChatMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("messageSent", message, () => {
        setMessage("");
      });
    }
  };

  const renderMessages = props.chat.map(c => {
    return (
      <li className="media" key={c.message} style={{ paddingBottom: "1rem" }}>
        <div className="media-body">
          <h6 className="media-heading" style={{ marginBottom: "0rem" }}>
            <Link to={`/profile/${c.userId}`}>@{c.from}</Link>
          </h6>
          {c.content}
        </div>
      </li>
    );
  });

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <form onSubmit={sendChatMessage}>
        <h3>Chat</h3>
        <ul className="list-unstyled">{renderMessages}</ul>
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
