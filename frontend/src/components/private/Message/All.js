import React from 'react';

const All = ({ messages, removeMessage }) => {
  return (
    <div className="container">
      {messages.map(i => (
        <div>
          <p>{i.content}</p>
          <button onClick={() => removeMessage(i._id, i.content)}>
            remove message
          </button>
        </div>
      ))}
    </div>
  );
};

export default All;
