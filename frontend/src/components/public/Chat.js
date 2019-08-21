import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  let socket;
  useEffect(() => {
    if (!socket) {
      socket = io(':3001');
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
    socket.emit('chat message', message);
  };

  return (
    <div class="container">
      <form onSubmit={sendChatMessage}>
        <input
          type="text"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Chat;
